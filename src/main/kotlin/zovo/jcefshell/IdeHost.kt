package zovo.jcefshell

import com.intellij.ide.BrowserUtil
import com.intellij.ide.util.PropertiesComponent
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.application.ModalityState
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.fileChooser.FileChooserFactory
import com.intellij.openapi.fileChooser.FileSaverDescriptor
import com.intellij.openapi.ide.CopyPasteManager
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.LocalFileSystem
import com.intellij.util.io.HttpRequests
import java.awt.Desktop
import java.awt.datatransfer.StringSelection
import java.io.File

/**
 * What the shell needs to know about the product. The rating link shows after [rateAfter] files opened without an
 * error and stops after a click. The Marketplace page is looked up only when the user clicks the link.
 */
class ProductInfo(
    val xmlId: String,
    val settingsKey: String,
    val rateAfter: Int,
    val fallbackRateUrl: String,
)

/** HostActions for one editor: clipboard, the IDE save dialog next to the source file, and the system browser. */
class IdeHost(private val project: Project?, private val source: File, private val product: ProductInfo) : HostActions {
    override fun copy(text: String) {
        ApplicationManager.getApplication().invokeLater { CopyPasteManager.getInstance().setContents(StringSelection(text)) }
    }

    override fun chooseSaveTarget(suggestedName: String, extensions: List<String>): File? {
        var result: File? = null
        ApplicationManager.getApplication().invokeAndWait({
            val descriptor = FileSaverDescriptor("Save From Viewer", "Choose where to save the file", extensions.firstOrNull() ?: "png")
            val dir = source.parentFile?.let { LocalFileSystem.getInstance().findFileByIoFile(it) }
            result = FileChooserFactory.getInstance().createSaveFileDialog(descriptor, project).save(dir, suggestedName)?.file
        }, ModalityState.defaultModalityState())
        return result
    }

    override fun openUrl(url: String) = BrowserUtil.browse(url)

    override fun rendered(): Boolean {
        val props = PropertiesComponent.getInstance()
        val opens = props.getInt(product.settingsKey + ".opens", 0) + 1
        props.setValue(product.settingsKey + ".opens", opens, 0)
        return opens >= product.rateAfter && !props.getBoolean(product.settingsKey + ".rated", false)
    }

    override fun rate() {
        PropertiesComponent.getInstance().setValue(product.settingsKey + ".rated", true)
        ApplicationManager.getApplication().executeOnPooledThread {
            BrowserUtil.browse(reviewUrl() ?: product.fallbackRateUrl)
        }
    }

    /** The plugin's review page, looked up by its xml id (one request, only after the user clicked "Rate"). */
    private fun reviewUrl(): String? = try {
        val json = HttpRequests.request("https://plugins.jetbrains.com/api/plugins/intellij/" + product.xmlId)
            .connectTimeout(5000).readTimeout(5000).readString()
        Regex("\"link\"\\s*:\\s*\"(/plugin/[A-Za-z0-9_.-]+)\"").find(json)?.groupValues?.get(1)?.let { "https://plugins.jetbrains.com$it/reviews" }
    } catch (t: Exception) {
        LOG.info("Marketplace page lookup failed: " + t.message)
        null
    }

    override fun openDefault() {
        ApplicationManager.getApplication().executeOnPooledThread {
            try {
                Desktop.getDesktop().open(source)
            } catch (t: Exception) {
                LOG.info("No default app for " + source.name + ": " + t.message)
            }
        }
    }

    private companion object { val LOG = logger<IdeHost>() }
}
