package zovo.model

import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder

class ModelHeaderTest {
    private val samples = File(System.getProperty("model.samples") ?: "samples")
    private lateinit var dir: File

    @Before fun setUp() { dir = File(System.getProperty("model.testTmp") ?: "build/test-tmp", "header-" + System.nanoTime()).apply { mkdirs() } }
    @After fun tearDown() { dir.deleteRecursively() }

    private fun binaryStl(n: Int): ByteArray {
        val b = ByteBuffer.allocate(84 + 50 * n).order(ByteOrder.LITTLE_ENDIAN)
        b.put("cube from a test".toByteArray()); b.position(80); b.putInt(n)
        return b.array()
    }

    @Test fun binaryStlTriangleCountFromTheHeader() {
        val f = File(dir, "cube.stl").apply { writeBytes(binaryStl(12)) }
        val text = ModelHeader.describe(f)
        assertTrue(text, text.contains("Format: binary STL\nTriangles: 12\nHeader: cube from a test"))
        val gear = ModelHeader.describe(File(samples, "gear.stl"))
        assertTrue(gear, gear.contains("Format: binary STL"))
        assertEquals(((File(samples, "gear.stl").length() - 84) / 50).toString(), Regex("Triangles: ([0-9,]+)").find(gear)!!.groupValues[1].replace(",", ""))
    }

    @Test fun asciiStlCountsFacets() {
        val facet = "facet normal 0 0 1\n outer loop\n  vertex 0 0 0\n  vertex 10 0 0\n  vertex 0 10 0\n endloop\nendfacet\n"
        val f = File(dir, "a.stl").apply { writeText("solid cube_10mm\n" + facet.repeat(12) + "endsolid cube_10mm\n") }
        assertTrue(ModelHeader.describe(f), ModelHeader.describe(f).contains("Format: ASCII STL\nSolid: cube_10mm\nTriangles: 12"))
    }

    @Test fun plyObjGlbGltfAnd3mf() {
        val ply = ModelHeader.describe(File(samples, "vase.ply"))
        assertTrue(ply, ply.contains("Format: PLY") && ply.contains("Element vertex:") && ply.contains("Element face:") && ply.contains("property uchar red"))
        val obj = ModelHeader.describe(File(samples, "torus-knot.obj"))
        assertTrue(obj, obj.contains("Format: Wavefront OBJ") && obj.contains("Material files: torus-knot.mtl"))
        val glb = ModelHeader.describe(File(samples, "robot-arm.glb"))
        assertTrue(glb, glb.contains("glTF binary (GLB) version 2") && glb.contains("Materials: 4") && glb.contains("Animations: 3"))
        val gltf = ModelHeader.describe(File(samples, "lantern.gltf"))
        assertTrue(gltf, gltf.contains("Format: glTF (JSON)") && gltf.contains("Buffers: 1") && gltf.contains("Images: 1"))
        val mf = ModelHeader.describe(File(samples, "bracket.3mf"))
        assertTrue(mf, mf.contains("Format: 3MF") && mf.contains("Unit: millimeter") && mf.contains("Objects: 2"))
    }

    @Test fun gltfCountsIgnoreNestedArraysAndStrings() {
        val json = """{"asset":{"generator":"t [x]","version":"2.0"},"nodes":[{"children":[1,2]},{"name":"a,b"},{}],"meshes":[],"extensionsRequired":["KHR_draco_mesh_compression"]}"""
        val s = ModelHeader.gltfSummary(json)
        assertTrue(s, s.contains("Generator: t [x]") && s.contains("Nodes: 3") && s.contains("Meshes: 0") && s.contains("Extensions required: KHR_draco_mesh_compression"))
    }

    @Test fun brokenFilesGiveAPlainMessage() {
        assertTrue(ModelHeader.describe(File(dir, "x.glb").apply { writeText("hello") }).contains("not a GLB"))
        assertTrue(ModelHeader.describe(File(dir, "x.ply").apply { writeText("plx") }).contains("not a PLY"))
        assertTrue(ModelHeader.describe(File(dir, "x.3mf").apply { writeText("not a zip") }).contains("could not be read"))
    }
}
