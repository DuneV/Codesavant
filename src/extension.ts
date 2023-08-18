import * as vscode from 'vscode';
import axios from 'axios';


export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('test-extension.sendRequestToServer', async () => {
		
		try {
		  	const activeEditor = vscode.window.activeTextEditor;
		  	if (!activeEditor) {
				vscode.window.showInformationMessage('No estas viendo nada');
			return;
		  }
		  
	// Obtén el contenido del archivo abierto actualmente en el editor
	const document = activeEditor.document;
	const fileContent = document.getText();

	// Define la URL de tu servidor
	const serverURL = 'http://localhost:3000/process-file';
	
	// Realiza una solicitud POST al servidor con el contenido del archivo
	const response = await axios.post(serverURL, { content: fileContent });
	
	// Si el servidor responde con éxito, muestra una notificación
	if (response.status === 200) {
        vscode.window.showInformationMessage('Solicitud al servidor completada con éxito');
      }
    } catch (error) {
		if (error instanceof Error){
      // Maneja errores de conexión o del servidor
      		vscode.window.showErrorMessage('Error al enviar la solicitud al servidor: ' + error.message);
		}
	}
  });
  let concept = vscode.commands.registerCommand('test-extension.helloWorld', () => {
	// The code you place here will be executed every time your command is executed
	// Display a message box to the user
	vscode.window.showInformationMessage('Hello World from test-extension!');
});

	context.subscriptions.push(disposable);
	context.subscriptions.push(concept);
}

// This method is called when your extension is deactivated
export function deactivate() {}

