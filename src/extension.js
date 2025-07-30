"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('fibonacci-indent.reindent', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const totalLines = document.lineCount;
        // Generate enough Fibonacci numbers
        const fibs = generateFibonacci(totalLines);
        editor.edit(editBuilder => {
            for (let i = 0; i < totalLines; i++) {
                const line = document.lineAt(i);
                const indent = ' '.repeat(fibs[i]);
                const text = line.text.trimStart(); // remove existing indentation
                const range = new vscode.Range(line.range.start, line.range.end);
                editBuilder.replace(range, indent + text);
            }
        });
    });
    let tabDisposable = vscode.commands.registerCommand('fibonacci-indent.tab', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const fibs = generateFibonacci(document.lineCount);
        editor.edit(editBuilder => {
            for (const selection of editor.selections) {
                const line = document.lineAt(selection.active.line);
                const indent = ' '.repeat(fibs[line.lineNumber]);
                const text = line.text.trimStart();
                const range = new vscode.Range(line.range.start, line.range.end);
                editBuilder.replace(range, indent + text);
            }
        });
    });
    let shiftTabDisposable = vscode.commands.registerCommand('fibonacci-indent.shiftTab', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const fibs = generateFibonacci(document.lineCount);
        editor.edit(editBuilder => {
            for (const selection of editor.selections) {
                const line = document.lineAt(selection.active.line);
                // Remove indentation (set to zero spaces)
                const text = line.text.trimStart();
                const range = new vscode.Range(line.range.start, line.range.end);
                editBuilder.replace(range, text);
            }
        });
    });
    context.subscriptions.push(disposable, tabDisposable, shiftTabDisposable);
}
function generateFibonacci(n) {
    const result = [0, 1];
    // const result = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}
function deactivate() { }
//# sourceMappingURL=extension.js.map