const { app, BrowserWindow, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        autoHideMenuBar: true,
        backgroundColor: "#05050b"
    });

    win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
    createWindow();

    // Vérifie les mises à jour
    setTimeout(() => {
        autoUpdater.checkForUpdatesAndNotify();
    }, 3000);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Nouvelle version disponible
autoUpdater.on("update-available", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Dragon Store",
        message: "🐉 Une nouvelle version de Dragon Store est disponible !",
        detail: "La mise à jour va être téléchargée automatiquement.",
        buttons: ["OK"]
    });
});

// Téléchargement terminé
autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Dragon Store",
        message: "✅ Mise à jour téléchargée !",
        detail: "Dragon Store va redémarrer pour installer la nouvelle version.",
        buttons: ["Redémarrer maintenant"]
    }).then(() => {
        autoUpdater.quitAndInstall();
    });
});

// Erreur de mise à jour
autoUpdater.on("error", (error) => {
    console.error("Erreur de mise à jour :", error);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});