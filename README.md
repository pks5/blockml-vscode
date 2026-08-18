# BlockML

Language support for **BlockML** (`.bml`) in Visual Studio Code and Cursor.

## V1 — limited syntax support

This is a **V1** release. Syntax support is **limited** because there is **no language server** yet.

You get TextMate-based highlighting, the BlockML color theme, and file icons. You do **not** get diagnostics, completions, hover, rename, or go-to-definition.

A **language server** and richer IDE features are planned for **V2**.

## Features

- **`.bml` language** — file type, comments, and bracket matching
- **Position-based syntax highlighting** — framework tags (block, properties, documentation, …) vs domain member names vs PascalCase type references
- **BlockML color theme** — required for visible coloring (see below)
- **File icons** — `.bml` icon in the explorer and editor tabs

## Color theme (required)

BlockML uses custom TextMate scopes. Generic themes such as Dark+ / Light+ do **not** color them correctly.

After installing the extension, select the **BlockML** color theme:

1. Command Palette (`Ctrl+K Ctrl+T` / `⌘K ⌘T`)
2. Choose **BlockML**

Also enable the **BlockML Icons** file icon theme if you want `.bml` file icons: Command Palette → **Preferences: File Icon Theme** → **BlockML Icons**.

## Coming in V2

- Language server (diagnostics, hover, completion)
- Semantic highlighting on top of the TextMate grammar
- Navigation between BML files (go to definition, find references)

## License

Apache-2.0
