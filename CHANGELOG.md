# Changelog

## Unreleased

Semantic highlighting via the language server.

- `@blockml/lsp` classifier runs in the extension host (`DocumentSemanticTokensProvider`) so nested files keep FrameworkRoles colors without waiting on LSP document sync
- `editor.semanticTokenColorCustomizations` paints custom token types (`type:bml`); TextMate `tokenColorCustomizations` is not enough for semantic tokens
- `contributes.semanticTokenScopes` still maps legend types onto the existing `*.bml` TextMate scopes
- Setting `blockml.bml.enableSemanticHighlighting` (default true) can turn the overlay off
- TextMate grammar remains as a lexical fallback before the classifier is ready

## 0.2.0

Language server integration (diagnostics only).

- Start `@blockml/lsp` as a stdio child process via `vscode-languageclient`
- Diagnostics on open/change/close (`source: blockml`)
- Settings `blockml.bml.enableLanguageServer` and `blockml.bml.trace.server` are active
- Extension entry point (`main`), TypeScript compile pipeline, VSIX includes server dependencies

Hover, completion, semantic highlighting, and navigation remain planned for a later V2 slice.

## 0.1.0

Initial V1 marketplace release.

- `.bml` language support (file type, comments, brackets)
- Position-based TextMate syntax highlighting
- BlockML color theme (required for visible syntax coloring)
- BlockML file icons

V1 has no language server. Diagnostics, completions, hover, and navigation are planned for V2.
