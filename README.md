# BlockML

Language support for **BlockML** (`.bml`) in Visual Studio Code and Cursor.

The extension is built entirely on the BlockML language server (`@blockml/lsp`). There is no XSD / XML schema integration.

## Features

- **`.bml` language** — file type, comments, and bracket matching
- **Syntax highlighting** — position-based roles (framework vs domain vs composition) via semantic tokens, with a TextMate grammar as fallback. Token colors overlay your current theme.
- **Hover** — type and documentation information from the language server
- **Syntax check** — parse and validation errors via the language server (`source: blockml`)
- **Navigation** — go to definition, peek definition, and find references (including Ctrl/Cmd-click)
- **Outline** — document symbols in the Outline view
- **Format** — format document via the language server
- **File icons** — `.bml` icon in the explorer and editor tabs (language icon; works with your current file icon theme)

Autocomplete is not implemented yet.

## Language server

The extension starts `@blockml/lsp` as a separate Node process (stdio). It currently provides **hover**, **diagnostics**, **navigation**, **outline**, and **format**. Semantic highlighting uses the same `@blockml/lsp` classifier inside the extension host (not an LSP round-trip). Completion is not available yet.

**Requirements:**

- Open a **workspace folder** (the server uses `workspaceFolders[0]`).
- Optionally configure the project via `bom.config.json` (`srcDir`, `libraries`).

Disable the server with the setting `blockml.bml.enableLanguageServer`. Disable semantic highlighting with `blockml.bml.enableSemanticHighlighting`. Trace LSP traffic with `blockml.bml.trace.server`.

## Coming next

- Autocomplete (completion)

## License

Apache-2.0
