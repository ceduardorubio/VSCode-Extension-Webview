import * as vscode from 'vscode';
import * as fs from 'fs';
import path = require('path');

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('peerjsChat.peerjsChat', () => {
		let local = vscode.Uri.file(path.join(context.extensionPath));
		const panel = vscode.window.createWebviewPanel(
			'Web View',
			'Web View',
			vscode.ViewColumn.One,
			{
			  enableScripts: true,
			  localResourceRoots: [local]
			}
		  );
		  panel.webview.html = getWebviewContent(context,panel);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}


function getWebviewContent(context: vscode.ExtensionContext,panel: vscode.WebviewPanel) {
	const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src','frontend', 'index.html'));
	let content =  fs.readFileSync(filePath.fsPath, 'utf8');
	const scriptsPath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src','frontend', 'js'));
	const scripts = panel.webview.asWebviewUri(scriptsPath).toString();
	console.log(scripts);
	let uContent = content.replace('<script src="js', '<script src="' +scripts + '/');
	return uContent;
  }