package zovo.model

import zovo.jcefshell.ProductInfo

/**
 * Support line and More tools (owner rule). Money links come from factory/sprint/funding.json; PayPal is
 * empty there, so it is not shown. The Rate link stays hidden until 3 models opened without an error.
 */
object Support {
    const val REPO = "https://github.com/theluckystrike/stl-viewer-jetbrains"
    const val SPONSOR = "https://github.com/sponsors/theluckystrike"
    const val XML_ID = "zovo.model-viewer"

    val PRODUCT = ProductInfo(XML_ID, "zovo.model-viewer", 3, "https://plugins.jetbrains.com/search?search=STL%20Viewer")

    /** [label, url, note] for the More tools list in the side panel. */
    val MORE = listOf(
        Triple("STL Viewer for VS Code", "https://marketplace.visualstudio.com/items?itemName=zovo.3d-model-viewer", "the same viewer for VS Code, Cursor and Windsurf"),
        Triple("DOCX & PPTX Viewer", "https://plugins.jetbrains.com/plugin/35878", "Word and PowerPoint files in the IDE"),
        Triple("NetCDF, HDF5 & NumPy Viewer", "https://plugins.jetbrains.com/plugin/35879", "scientific data files in the IDE"),
        Triple("Source code and issues", REPO, "MIT licence"),
        Triple("Sponsor on GitHub", SPONSOR, "keeps these viewers free"),
        Triple("More Zovo tools", "https://github.com/theluckystrike", "all free tools by the same developer"),
    )

    private fun esc(s: String) = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;")

    fun footerHtml(): String {
        val sep = "<span class=\"zovo-sep\" aria-hidden=\"true\">·</span>"
        val line = "<div class=\"zovo-support zovo-support-fixed\" id=\"zovo-support\">" +
            "<a id=\"zovo-rate\" href=\"#rate\" hidden title=\"Rate or review this plugin on JetBrains Marketplace\">Rate on JetBrains Marketplace</a><span class=\"zovo-sep\" aria-hidden=\"true\" hidden>·</span>" +
            "<a href=\"" + REPO + "\" title=\"Source code and issues\">GitHub</a>" + sep +
            "<a href=\"" + SPONSOR + "\" title=\"Open the GitHub Sponsors page\">Sponsor</a>" + sep +
            "<a href=\"#more\" title=\"Other free tools by Zovo\">More tools</a></div>"
        val items = MORE.joinToString("") { (label, url, note) ->
            "<li><a href=\"" + esc(url) + "\">" + esc(label) + "</a> <span class=\"note\">" + esc(note) + "</span></li>"
        }
        return line + "<section id=\"zovo-more\" hidden><h2>More tools</h2><ul>" + items + "</ul></section>"
    }
}
