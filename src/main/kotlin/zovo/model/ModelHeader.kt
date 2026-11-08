package zovo.model

import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.io.RandomAccessFile
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.charset.StandardCharsets
import java.util.zip.ZipFile

/**
 * Plain-text facts about a model file, read without three.js: shown when WebGL or JCEF is not available.
 * Reads only headers, or streams the file once for text formats. Never loads a whole file into memory.
 */
object ModelHeader {
    private const val MB = 1024L * 1024

    fun describe(f: File): String = try {
        val size = f.length()
        val head = "File: ${f.name}\nSize: ${fmtSize(size)} (${"%,d".format(size)} bytes)\n"
        head + when (f.extension.lowercase()) {
            "stl" -> stl(f)
            "ply" -> ply(f)
            "obj" -> obj(f)
            "glb" -> glb(f)
            "gltf" -> gltf(f)
            "3mf" -> threeMf(f)
            else -> "Unknown format."
        }
    } catch (t: Exception) {
        "The file could not be read: ${t.message ?: t.javaClass.simpleName}"
    }

    fun fmtSize(n: Long): String = when {
        n < 1024 -> "$n B"
        n < MB -> "%.1f KB".format(n / 1024.0)
        n < 1024 * MB -> "%.1f MB".format(n / MB.toDouble())
        else -> "%.1f GB".format(n / (1024.0 * MB))
    }

    private fun readHead(f: File, n: Int): ByteArray = RandomAccessFile(f, "r").use { raf ->
        val b = ByteArray(minOf(n.toLong(), raf.length()).toInt()); raf.readFully(b); b
    }

    private fun printable(b: ByteArray) = String(b, StandardCharsets.ISO_8859_1).map { if (it in ' '..'~') it else ' ' }.joinToString("").trim()

    /** Binary STL when 84 + 50 * count equals the file size; otherwise ASCII, counted by "facet" lines. */
    fun stl(f: File): String {
        val size = f.length()
        if (size >= 84) {
            val h = readHead(f, 84)
            val n = ByteBuffer.wrap(h, 80, 4).order(ByteOrder.LITTLE_ENDIAN).int.toLong() and 0xffffffffL
            if (84 + n * 50 == size) {
                val header = printable(h.copyOfRange(0, 80))
                return "Format: binary STL\nTriangles: ${"%,d".format(n)}\n" + (if (header.isNotEmpty()) "Header: $header\n" else "")
            }
        }
        var facets = 0L; var solid: String? = null
        lines(f) { line ->
            val t = line.trimStart()
            if (solid == null && t.startsWith("solid")) solid = t.removePrefix("solid").trim()
            if (t.startsWith("facet")) facets++
        }
        if (facets == 0L && solid == null) return "Format: STL, but neither binary nor ASCII STL could be read (the header says another triangle count than the file size has).\n"
        return "Format: ASCII STL\n" + (if (!solid.isNullOrEmpty()) "Solid: $solid\n" else "") + "Triangles: ${"%,d".format(facets)}\n"
    }

    fun ply(f: File): String {
        val text = String(readHead(f, 65536), StandardCharsets.ISO_8859_1)
        if (!text.startsWith("ply")) return "Format: not a PLY file (it does not start with \"ply\").\n"
        val end = text.indexOf("end_header")
        if (end < 0) return "Format: PLY, but the header has no end_header line.\n"
        val sb = StringBuilder("Format: PLY\n")
        for (line in text.substring(0, end).lines().map { it.trim() }) {
            when {
                line.startsWith("format ") -> sb.append("Encoding: ").append(line.removePrefix("format ")).append('\n')
                line.startsWith("element ") -> { val p = line.split(Regex("\\s+")); if (p.size >= 3) sb.append("Element ${p[1]}: ${p[2].toLongOrNull()?.let { "%,d".format(it) } ?: p[2]}\n") }
                line.startsWith("property ") -> sb.append("  property ").append(line.removePrefix("property ")).append('\n')
                line.startsWith("comment ") -> sb.append("Comment: ").append(line.removePrefix("comment ")).append('\n')
            }
        }
        return sb.toString()
    }

    fun obj(f: File): String {
        var v = 0L; var vt = 0L; var vn = 0L; var faces = 0L; var objects = 0L; var groups = 0L
        val libs = ArrayList<String>()
        lines(f) { line ->
            when {
                line.startsWith("v ") -> v++
                line.startsWith("vt ") -> vt++
                line.startsWith("vn ") -> vn++
                line.startsWith("f ") -> faces++
                line.startsWith("o ") -> objects++
                line.startsWith("g ") -> groups++
                line.startsWith("mtllib ") && libs.size < 8 -> libs.add(line.removePrefix("mtllib ").trim())
            }
        }
        return "Format: Wavefront OBJ\nVertices: ${"%,d".format(v)}\nFaces: ${"%,d".format(faces)}\nTexture coordinates: ${"%,d".format(vt)}\nNormals: ${"%,d".format(vn)}\n" +
            "Objects: $objects, groups: $groups\n" + (if (libs.isNotEmpty()) "Material files: ${libs.joinToString(", ")}\n" else "")
    }

    fun glb(f: File): String {
        val h = readHead(f, 20)
        if (h.size < 20 || String(h, 0, 4, StandardCharsets.ISO_8859_1) != "glTF") return "Format: not a GLB file (it does not start with \"glTF\").\n"
        val bb = ByteBuffer.wrap(h).order(ByteOrder.LITTLE_ENDIAN)
        val version = bb.getInt(4); val length = bb.getInt(8).toLong() and 0xffffffffL; val jsonLen = bb.getInt(12)
        val sb = StringBuilder("Format: glTF binary (GLB) version $version\nLength in header: ${"%,d".format(length)} bytes\n")
        if (jsonLen in 1..(16 * MB).toInt() && 20L + jsonLen <= f.length()) {
            val json = RandomAccessFile(f, "r").use { raf -> raf.seek(20); val b = ByteArray(jsonLen); raf.readFully(b); String(b, StandardCharsets.UTF_8) }
            sb.append(gltfSummary(json))
        }
        return sb.toString()
    }

    fun gltf(f: File): String {
        if (f.length() > 64 * MB) return "Format: glTF (JSON), too big to summarise here.\n"
        return "Format: glTF (JSON)\n" + gltfSummary(f.readText(StandardCharsets.UTF_8))
    }

    /** Counts the top-level arrays of a glTF JSON document without a JSON library (only bracket depth). */
    fun gltfSummary(json: String): String {
        val sb = StringBuilder()
        Regex("\"generator\"\\s*:\\s*\"((?:[^\"\\\\]|\\\\.){0,200})\"").find(json)?.let { sb.append("Generator: ").append(it.groupValues[1]).append('\n') }
        for (key in listOf("scenes", "nodes", "meshes", "materials", "textures", "images", "animations", "skins", "buffers")) {
            val n = topLevelArrayCount(json, key) ?: continue
            sb.append(key.replaceFirstChar { it.uppercase() }).append(": ").append(n).append('\n')
        }
        Regex("\"extensionsRequired\"\\s*:\\s*\\[([^\\]]*)]").find(json)?.let { sb.append("Extensions required: ").append(it.groupValues[1].replace("\"", "").trim()).append('\n') }
        return sb.toString()
    }

    private fun topLevelArrayCount(json: String, key: String): Int? {
        var depth = 0; var i = 0; var inStr = false
        while (i < json.length) {
            val c = json[i]
            if (inStr) { if (c == '\\') i++ else if (c == '"') inStr = false; i++; continue }
            when (c) {
                '"' -> {
                    if (depth == 1 && json.startsWith("\"$key\"", i)) {
                        var j = i + key.length + 2
                        while (j < json.length && json[j].isWhitespace()) j++
                        if (j < json.length && json[j] == ':') { j++; while (j < json.length && json[j].isWhitespace()) j++; if (j < json.length && json[j] == '[') return countItems(json, j) }
                    }
                    inStr = true
                }
                '{', '[' -> depth++
                '}', ']' -> depth--
            }
            i++
        }
        return null
    }

    private fun countItems(json: String, open: Int): Int {
        var depth = 0; var i = open; var inStr = false; var items = 0; var any = false
        while (i < json.length) {
            val c = json[i]
            if (inStr) { if (c == '\\') i++ else if (c == '"') inStr = false; i++; continue }
            when (c) {
                '"' -> { inStr = true; if (depth == 1) any = true }
                '{', '[' -> { depth++; if (depth == 2) any = true }
                '}', ']' -> { depth--; if (depth == 0) return if (any) items + 1 else 0 }
                ',' -> if (depth == 1) items++
                else -> if (depth == 1 && !c.isWhitespace()) any = true
            }
            i++
        }
        return items
    }

    fun threeMf(f: File): String {
        ZipFile(f).use { zip ->
            val model = zip.entries().asSequence().firstOrNull { it.name.lowercase().endsWith(".model") }
                ?: return "Format: 3MF package without a 3D model part.\n"
            var objects = 0L; var triangles = 0L; var vertices = 0L; var unit: String? = null
            BufferedReader(InputStreamReader(zip.getInputStream(model), StandardCharsets.UTF_8), 1 shl 16).use { r ->
                val buf = CharArray(1 shl 16); var carry = ""
                while (true) {
                    val n = r.read(buf); if (n < 0) break
                    val s = carry + String(buf, 0, n)
                    if (unit == null) Regex("unit=\"([a-z]+)\"").find(s)?.let { unit = it.groupValues[1] }
                    // count matches that start before the last CARRY chars; those are counted with the next read
                    val limit = s.length - CARRY
                    objects += count(s, "<object ", limit); triangles += count(s, "<triangle ", limit); vertices += count(s, "<vertex ", limit)
                    carry = s.substring(maxOf(0, limit))
                }
                objects += count(carry, "<object "); triangles += count(carry, "<triangle "); vertices += count(carry, "<vertex ")
            }
            return "Format: 3MF\nModel part: ${model.name}\nUnit: ${unit ?: "millimeter"}\nObjects: $objects\nVertices: ${"%,d".format(vertices)}\nTriangles: ${"%,d".format(triangles)}\n"
        }
    }

    private const val CARRY = 16

    /** Matches of needle that start before limit. */
    private fun count(s: String, needle: String, limit: Int = Int.MAX_VALUE): Int {
        var n = 0; var i = s.indexOf(needle)
        while (i in 0 until limit) { n++; i = s.indexOf(needle, i + needle.length) }
        return n
    }

    private inline fun lines(f: File, each: (String) -> Unit) {
        BufferedReader(InputStreamReader(f.inputStream(), StandardCharsets.ISO_8859_1), 1 shl 16).use { r ->
            while (true) { val line = r.readLine() ?: break; each(line) }
        }
    }
}
