import * as vscode from "vscode";
import axios from "axios";

async function runPython(){
  const { spawnSync } = require('child_process');
  const pythonProcess = await spawnSync('python', [
    'C:/Users/danie/OneDrive - Universidad de los Andes/2023_2/codesavant-dev/Codesavant/src/server.py'
  ]);
  const result = pythonProcess.stdout?.toString()?.trim();
  const error = pythonProcess.stderr?.toString()?.trim();
  console.log(result)
  console.log(error)
}

export function activate(context: vscode.ExtensionContext) {
  runPython();
  let disposable = vscode.commands.registerCommand('intelliuml.disposable', async (fileUri) => {
    console.log(fileUri);
  })
  let openFile = vscode.commands.registerCommand(
    "intelliuml.openFile", 
    async () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    console.log("Abriendo archivo");
    vscode.window.showInformationMessage("Abrir archivo");
    const serverURL = "http://localhost:3000/open-file";
    const response = await axios.post(serverURL,{ content: "~" });
    console.log(response);
  });

  let sendRequestToServer = vscode.commands.registerCommand(
    "intelliuml.sendRequestToServer",
    async () => {
      try {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
          vscode.window.showErrorMessage("No hay ningún editor activado");
          return;
        } else if (activeEditor.document.fileName.slice(-3) != "xmi") {
          vscode.window.showErrorMessage("Debe subir un archivo .XMI");
          return;
        }

        // Obtén el contenido del archivo abierto actualmente en el editor
        const document = activeEditor.document;
        const fileContent = document.getText();

        // Define la URL de tu servidor
        const serverURL = "http://localhost:3000/process-file";

        // Realiza una solicitud POST al servidor con el contenido del archivo
        const response = await axios.post(serverURL, { content: fileContent });
        console.log(response);
        // Si el servidor responde con éxito, muestra una notificación
        if (response.status === 200) {
          vscode.window.showInformationMessage(
            "Solicitud al servidor completada con éxito"
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          // Maneja errores de conexión o del servidor
          vscode.window.showErrorMessage(
            "Error al enviar la solicitud al servidor: " + error.message
          );
        }
      }
    }
  );
  let helloWorld = vscode.commands.registerCommand(
    "intelliuml.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from test-extension!");
    }
  );

  context.subscriptions.push(openFile);
  context.subscriptions.push(sendRequestToServer);
  context.subscriptions.push(helloWorld);
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
