package zovo.model;

import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.fileEditor.FileEditorPolicy;
import com.intellij.openapi.fileEditor.FileEditorProvider;
import com.intellij.openapi.project.DumbAware;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;
import zovo.jcefshell.ShellEditor;

/** STL, GLB, PLY and 3MF open in the 3D viewer instead of the "binary file" editor. */
public class ModelEditorProvider implements FileEditorProvider, DumbAware {
    @Override
    public boolean accept(@NotNull Project project, @NotNull VirtualFile file) {
        return !file.isDirectory() && ModelFormats.isBinary(file.getExtension());
    }

    @Override
    public boolean acceptRequiresReadAction() { return false; }

    @Override
    public @NotNull FileEditor createEditor(@NotNull Project project, @NotNull VirtualFile file) {
        return create(project, file);
    }

    static @NotNull FileEditor create(@NotNull Project project, @NotNull VirtualFile file) {
        return new ShellEditor(project, file, "model", "3D View", Support.INSTANCE.footerHtml(), ModelHeader.INSTANCE::describe, Support.INSTANCE.getPRODUCT());
    }

    @Override public @NotNull String getEditorTypeId() { return "zovo-model-viewer"; }
    @Override public @NotNull FileEditorPolicy getPolicy() { return FileEditorPolicy.HIDE_DEFAULT_EDITOR; }
}
