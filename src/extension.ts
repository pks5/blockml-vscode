import * as path from "node:path";
import {
  EventEmitter,
  SemanticTokens,
  SemanticTokensLegend,
  languages,
  workspace,
  type CancellationToken,
  type DocumentSemanticTokensProvider,
  type ExtensionContext,
  type TextDocument,
} from "vscode";
import {
  LanguageClient,
  TransportKind,
  type LanguageClientOptions,
  type ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

type LspSemanticTokens = {
  SEMANTIC_TOKEN_TYPES: readonly string[];
  semanticTokensFor: (text: string) => { data: number[] };
};

let lspSemantic: LspSemanticTokens | undefined;

function isSemanticHighlightingEnabled(): boolean {
  return workspace
    .getConfiguration("blockml.bml")
    .get<boolean>("enableSemanticHighlighting", true);
}

async function loadLspSemantic(): Promise<LspSemanticTokens> {
  lspSemantic ??= (await import("@blockml/lsp")) as LspSemanticTokens;
  return lspSemantic;
}

async function tokensForDocument(
  document: TextDocument,
): Promise<SemanticTokens | undefined> {
  if (!isSemanticHighlightingEnabled()) {
    return undefined;
  }
  const lsp = await loadLspSemantic();
  const result = lsp.semanticTokensFor(document.getText());
  return new SemanticTokens(new Uint32Array(result.data));
}

function activateSemanticHighlighting(context: ExtensionContext): void {
  const changeEmitter = new EventEmitter<void>();
  context.subscriptions.push(changeEmitter);

  context.subscriptions.push(
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("blockml.bml.enableSemanticHighlighting")) {
        changeEmitter.fire();
      }
    }),
  );

  void loadLspSemantic()
    .then((lsp) => {
      const legend = new SemanticTokensLegend([...lsp.SEMANTIC_TOKEN_TYPES], []);
      const provider: DocumentSemanticTokensProvider = {
        onDidChangeSemanticTokens: changeEmitter.event,
        provideDocumentSemanticTokens: (
          document: TextDocument,
          _token: CancellationToken,
        ) => tokensForDocument(document),
      };
      context.subscriptions.push(
        languages.registerDocumentSemanticTokensProvider(
          [
            { language: "bml", scheme: "file" },
            { language: "bml", scheme: "untitled" },
          ],
          provider,
          legend,
        ),
      );
      changeEmitter.fire();
    })
    .catch((error: unknown) => {
      console.error("BlockML: failed to load semantic token classifier", error);
    });
}

function activateLanguageServer(context: ExtensionContext): void {
  const enableLanguageServer = workspace
    .getConfiguration("blockml.bml")
    .get<boolean>("enableLanguageServer", true);

  if (!enableLanguageServer) {
    return;
  }

  const serverModule = context.asAbsolutePath(
    path.join("node_modules", "@blockml", "lsp", "dist", "server.js"),
  );

  const executableOptions = {
    env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" },
  };

  const serverOptions: ServerOptions = {
    run: {
      command: process.execPath,
      args: [serverModule],
      transport: TransportKind.stdio,
      options: executableOptions,
    },
    debug: {
      command: process.execPath,
      args: ["--inspect=6009", serverModule],
      transport: TransportKind.stdio,
      options: executableOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "bml" },
      { scheme: "untitled", language: "bml" },
      { scheme: "file", pattern: "**/*.bml" },
    ],
    diagnosticCollectionName: "blockml",
    middleware: {
      provideDocumentSemanticTokens: (document, _token, _next) =>
        tokensForDocument(document),
    },
  };

  client = new LanguageClient(
    "blockml.bml",
    "BlockML Language Server",
    serverOptions,
    clientOptions,
  );

  context.subscriptions.push(client);
  void client.start();
}

export function activate(context: ExtensionContext): void {
  activateSemanticHighlighting(context);
  activateLanguageServer(context);
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
