package zovo.model

import com.intellij.openapi.fileEditor.FileEditorPolicy
import com.intellij.openapi.fileEditor.ex.FileEditorProviderManager
import com.intellij.openapi.util.Disposer
import com.intellij.openapi.vfs.LocalFileSystem
import com.intellij.testFramework.fixtures.BasePlatformTestCase
import zovo.jcefshell.ShellEditor
import java.io.File

class ProviderTest : BasePlatformTestCase() {
    private val binary = ModelEditorProvider()
    private val text = ModelTextEditorProvider()

    fun testAcceptsEachExtension() {
        for (ext in listOf("stl", "glb", "ply", "3mf", "STL", "Glb")) {
            val vf = myFixture.addFileToProject("a/x.$ext", "").virtualFile
            assertTrue(ext, binary.accept(project, vf)); assertFalse(ext, text.accept(project, vf))
        }
        for (ext in listOf("obj", "gltf", "OBJ")) {
            val vf = myFixture.addFileToProject("b/x.$ext", "").virtualFile
            assertTrue(ext, text.accept(project, vf)); assertFalse(ext, binary.accept(project, vf))
        }
        for (ext in listOf("txt", "fbx", "mtl", "bin", "png", "step")) {
            val vf = myFixture.addFileToProject("c/x.$ext", "").virtualFile
            assertFalse(ext, binary.accept(project, vf) || text.accept(project, vf))
        }
        assertEquals(FileEditorPolicy.HIDE_DEFAULT_EDITOR, binary.policy)
        assertEquals(FileEditorPolicy.PLACE_BEFORE_DEFAULT_EDITOR, text.policy)
    }

    fun testFileTypes() {
        assertEquals("3D Model", myFixture.addFileToProject("t/a.stl", "").virtualFile.fileType.name)
        assertEquals("3D Model", myFixture.addFileToProject("t/a.3mf", "").virtualFile.fileType.name)
        assertEquals("Wavefront OBJ", myFixture.addFileToProject("t/a.obj", "v 0 0 0").virtualFile.fileType.name)
        assertEquals("glTF", myFixture.addFileToProject("t/a.gltf", "{}").virtualFile.fileType.name)
        assertTrue(ModelFileType.BINARY.isBinary)
        assertFalse(ModelFileType.OBJ.isBinary)
    }

    fun testOpensTheSampleGlbInTheViewer() {
        val vf = LocalFileSystem.getInstance().refreshAndFindFileByIoFile(File(System.getProperty("model.samples"), "robot-arm.glb"))!!
        val providers = FileEditorProviderManager.getInstance().getProviderList(project, vf)
        assertTrue(providers.map { it.javaClass.name }.toString(), providers.any { it is ModelEditorProvider })
        val editor = binary.createEditor(project, vf)
        try {
            assertTrue(editor is ShellEditor)
            assertEquals(vf, editor.file)
            assertEquals("3D View", editor.name)
            assertFalse(editor.isModified)
        } finally {
            Disposer.dispose(editor)
        }
    }

    fun testSupportLinksAreHttpsAndRateIsHidden() {
        val html = Support.footerHtml()
        assertTrue(html, html.contains("id=\"zovo-rate\" href=\"#rate\" hidden"))
        assertTrue(html.contains("https://github.com/sponsors/theluckystrike"))
        assertTrue(html.contains("35878") && html.contains("35879") && html.contains("zovo.3d-model-viewer"))
        assertFalse(html.contains("paypal"))
        for ((_, url, _) in Support.MORE) assertTrue(url, url.startsWith("https://"))
    }
}
