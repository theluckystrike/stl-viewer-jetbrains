package zovo.model;

import com.intellij.openapi.fileTypes.FileType;
import com.intellij.openapi.util.IconLoader;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.swing.*;

/** File types, so the IDE does not ask what .stl, .glb, .ply, .3mf, .obj or .gltf files are. OBJ and glTF stay text. */
public final class ModelFileType implements FileType {
    private static final Icon ICON = IconLoader.getIcon("/icons/model.svg", ModelFileType.class);

    public static final ModelFileType BINARY = new ModelFileType("3D Model", "3D model (STL, GLB, PLY or 3MF)", "stl", true);
    public static final ModelFileType OBJ = new ModelFileType("Wavefront OBJ", "Wavefront OBJ 3D model", "obj", false);
    public static final ModelFileType GLTF = new ModelFileType("glTF", "glTF 3D model (JSON)", "gltf", false);

    private final String name;
    private final String description;
    private final String extension;
    private final boolean binary;

    private ModelFileType(String name, String description, String extension, boolean binary) {
        this.name = name;
        this.description = description;
        this.extension = extension;
        this.binary = binary;
    }

    @Override public @NotNull String getName() { return name; }
    @Override public @NotNull String getDescription() { return description; }
    @Override public @NotNull String getDefaultExtension() { return extension; }
    @Override public @Nullable Icon getIcon() { return ICON; }
    @Override public boolean isBinary() { return binary; }
    @Override public boolean isReadOnly() { return false; }
}
