# BlockML

Language support for **BlockML** (`.bml`) in Visual Studio Code and Cursor.

The extension is built entirely on the BlockML language server (`@blockml/lsp`). There is no XSD / XML schema integration.

## Features

- **`.bml` language** — file type, comments, and bracket matching
- **Syntax highlighting** — TextMate grammar plus token colors on top of your current color theme (framework tags vs domain members vs type references)
- **Hover** — type and documentation information from the language server
- **Syntax check** — parse and validation errors via the language server (`source: blockml`)
- **Navigation** — go to definition, peek definition, and find references (including Ctrl/Cmd-click)
- **Outline** — document symbols in the Outline view
- **Format** — format document via the language server
- **File icons** — `.bml` icon in the explorer and editor tabs (language icon; works with your current file icon theme)

Autocomplete is not implemented yet. Coloring is lexical (TextMate); LSP semantic tokens are not used yet.

## Language server

The extension starts `@blockml/lsp` as a separate Node process (stdio). It currently provides **hover**, **diagnostics**, **navigation**, **outline**, and **format**. Completion and semantic highlighting are not available yet.

**Requirements:**

- Open a **workspace folder** (the server uses `workspaceFolders[0]`).
- Optionally configure the project via `bom.config.json` (`srcDir`, `libraries`).

Disable the server with the setting `blockml.bml.enableLanguageServer`. Trace LSP traffic with `blockml.bml.trace.server`.

## Coming next

- Autocomplete (completion)
- Semantic highlighting on top of the TextMate grammar

## License

Apache-2.0
