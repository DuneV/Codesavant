"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
function activate(context) {
    let openFile = vscode.commands.registerCommand("intelliuml.openFile", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const openExplorer = require("open-file-explorer");
        const path = "~";
        vscode.window.showInformationMessage("Abrir archivo");
        console.log("hola");
        openExplorer(path, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                //Do Something
            }
        });
    });
    let sendRequestToServer = vscode.commands.registerCommand("intelliuml.sendRequestToServer", async () => {
        try {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor) {
                vscode.window.showErrorMessage("No hay ningún editor activado");
                return;
            }
            else if (activeEditor.document.fileName.slice(-3) != "xmi") {
                vscode.window.showErrorMessage("Debe subir un archivo .XMI");
                return;
            }
            // Obtén el contenido del archivo abierto actualmente en el editor
            const document = activeEditor.document;
            const fileContent = document.getText();
            // Define la URL de tu servidor
            const serverURL = "http://localhost:3000/process-file";
            // Realiza una solicitud POST al servidor con el contenido del archivo
            const response = await axios_1.default.post(serverURL, { content: fileContent });
            console.log(response);
            // Si el servidor responde con éxito, muestra una notificación
            if (response.status === 200) {
                vscode.window.showInformationMessage("Solicitud al servidor completada con éxito");
            }
        }
        catch (error) {
            if (error instanceof Error) {
                // Maneja errores de conexión o del servidor
                vscode.window.showErrorMessage("Error al enviar la solicitud al servidor: " + error.message);
            }
        }
    });
    let helloWorld = vscode.commands.registerCommand("intelliuml.helloWorld", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("Hello World from test-extension!");
    });
    context.subscriptions.push(openFile);
    context.subscriptions.push(sendRequestToServer);
    context.subscriptions.push(helloWorld);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map