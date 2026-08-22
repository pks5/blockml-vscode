# BlockML

Language support for **BlockML** (`.bml`) in Visual Studio Code and Cursor.

## Features

- **`.bml` language** — file type, comments, and bracket matching
- **Position-based syntax highlighting** — framework tags (block, properties, documentation, …) vs domain member names vs PascalCase type references
- **Diagnostics** — parse and validation errors via the BlockML language server (`source: blockml`)
- **BlockML color theme** — required for visible coloring (see below)
- **File icons** — `.bml` icon in the explorer and editor tabs
- **XSD** — `.bml` stays an XML language participant, so `xsi:schemaLocation` / `bml.xsd` still work if [XML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml) (Red Hat) is installed. The BlockML color theme also colors XML/XSD files.

## Language server

The extension starts `@blockml/lsp` as a separate Node process (stdio). Currently it provides **diagnostics only** — no hover, completion, or format yet.

**Requirements:**

- Open a **workspace folder** (the server uses `workspaceFolders[0]`).
- Optionally configure the project via `bom.config.json` (`srcDir`, `libraries`).

Disable the server with the setting `blockml.bml.enableLanguageServer`. Trace LSP traffic with `blockml.bml.trace.server`.

## Color theme (required)

BlockML uses custom TextMate scopes. Generic themes such as Dark+ / Light+ do **not** color them correctly.

After installing the extension, select the **BlockML** color theme:

1. Command Palette (`Ctrl+K Ctrl+T` / `⌘K ⌘T`)
2. Choose **BlockML**

Also enable the **BlockML Icons** file icon theme if you want `.bml` file icons: Command Palette → **Preferences: File Icon Theme** → **BlockML Icons**.

## Coming in V2

- Hover, completion, and format
- Semantic highlighting on top of the TextMate grammar
- Navigation between BML files (go to definition, find references)

## License

Apache-2.0
