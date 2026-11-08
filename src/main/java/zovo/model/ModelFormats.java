package zovo.model;

import org.jetbrains.annotations.Nullable;

import java.util.Locale;
import java.util.Set;

/** The six model formats of the VS Code version. Binary ones hide the IDE's binary editor; OBJ and glTF keep their text editor as a second tab. */
public final class ModelFormats {
    public static final Set<String> BINARY = Set.of("stl", "glb", "ply", "3mf");
    public static final Set<String> TEXT = Set.of("obj", "gltf");

    private ModelFormats() { }

    public static @Nullable String normalize(@Nullable String extension) {
        return extension == null ? null : extension.toLowerCase(Locale.ROOT);
    }

    public static boolean isBinary(@Nullable String extension) { return BINARY.contains(normalize(extension)); }
    public static boolean isText(@Nullable String extension) { return TEXT.contains(normalize(extension)); }
    public static boolean isModel(@Nullable String extension) { return isBinary(extension) || isText(extension); }
}
