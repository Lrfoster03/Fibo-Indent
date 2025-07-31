import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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
        if (!editor) { return; }
        const document = editor.document;

        editor.edit(editBuilder => {
            for (const selection of editor.selections) {
                const line = document.lineAt(selection.active.line);
                const currentIndent = line.firstNonWhitespaceCharacterIndex;
                const fibs = generateFibonacci(20); // Generate enough numbers
                
                // Find next Fibonacci number larger than current indent
                const nextIndent = fibs.find(n => n > currentIndent) || currentIndent + 1;
                
                const text = line.text.trimStart();
                const range = new vscode.Range(line.range.start, line.range.end);
                editBuilder.replace(range, ' '.repeat(nextIndent) + text);
            }
        });
    });

    let shiftTabDisposable = vscode.commands.registerCommand('fibonacci-indent.shiftTab', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }
        const document = editor.document;

        editor.edit(editBuilder => {
            for (const selection of editor.selections) {
                const line = document.lineAt(selection.active.line);
                const currentIndent = line.firstNonWhitespaceCharacterIndex;
                const fibs = generateFibonacci(20); // Generate enough numbers
                
                // Find largest Fibonacci number smaller than current indent
                const prevIndent = fibs.reverse().find(n => n < currentIndent) || 0;
                
                const text = line.text.trimStart();
                const range = new vscode.Range(line.range.start, line.range.end);
                editBuilder.replace(range, ' '.repeat(prevIndent) + text);
            }
        });
    });

    context.subscriptions.push(disposable, tabDisposable, shiftTabDisposable);
}

function generateFibonacci(n: number): number[] {
    const result = [0, 1];
	// const result = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;

}


export function deactivate() {}
