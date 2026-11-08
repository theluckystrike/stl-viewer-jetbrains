package zovo.model;

import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.fileEditor.FileEditorPolicy;
import com.intellij.openapi.fileEditor.FileEditorProvider;
import com.intellij.openapi.project.DumbAware;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;

/** OBJ and glTF open in the 3D viewer first; their text stays one tab away ("Text" at the bottom of the editor). */
public class ModelTextEditorProvider implements FileEditorProvider, DumbAware {
    @Override
    public boolean accept(@NotNull Project project, @NotNull VirtualFile file) {
        return !file.isDirectory() && ModelFormats.isText(file.getExtension());
    }

    @Override
    public boolean acceptRequiresReadAction() { return false; }

    @Override
    public @NotNull FileEditor createEditor(@NotNull Project project, @NotNull VirtualFile file) {
        return ModelEditorProvider.create(project, file);
    }

    @Override public @NotNull String getEditorTypeId() { return "zovo-model-viewer-text"; }
    @Override public @NotNull FileEditorPolicy getPolicy() { return FileEditorPolicy.PLACE_BEFORE_DEFAULT_EDITOR; }
}
