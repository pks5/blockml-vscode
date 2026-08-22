import * as path from "node:path";
import { workspace, type ExtensionContext } from "vscode";
import {
  LanguageClient,
  TransportKind,
  type LanguageClientOptions,
  type ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext): void {
  const enableLanguageServer = workspace
    .getConfiguration("blockml.bml")
    .get<boolean>("enableLanguageServer", true);

  if (!enableLanguageServer) {
    return;
  }

  const serverModule = context.asAbsolutePath(
    path.join("node_modules", "@blockml", "lsp", "dist", "server.js"),
  );

  const serverOptions: ServerOptions = {
    run: {
      command: process.execPath,
      args: [serverModule],
      transport: TransportKind.stdio,
    },
    debug: {
      command: process.execPath,
      args: ["--inspect=6009", serverModule],
      transport: TransportKind.stdio,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "bml" },
      { scheme: "file", pattern: "**/*.bml" },
    ],
    diagnosticCollectionName: "blockml",
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

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
