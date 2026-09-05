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

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();

    setTimeout(() => {
        autoUpdater.checkForUpdates();
    }, 3000);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Mise à jour
autoUpdater.autoDownload = false;

autoUpdater.on("update-available", async (info) => {

    const result = await dialog.showMessageBox(win, {
        type: "info",
        title: "Dragon Store",
        message: "🐉 Une nouvelle version est disponible !",
        detail: `Version actuelle : ${app.getVersion()}\nNouvelle version : ${info.version}`,
        buttons: ["METTRE À JOUR", "PLUS TARD"],
        defaultId: 0,
        cancelId: 1
    });

    if (result.response === 0) {
        try {
            await autoUpdater.downloadUpdate();
        } catch (error) {
            dialog.showErrorBox(
                "Dragon Store",
                "❌ Impossible de télécharger la mise à jour."
            );

            console.error(error);
        }
    }
});

autoUpdater.on("update-downloaded", async () => {

    const result = await dialog.showMessageBox(win, {
        type: "info",
        title: "Dragon Store",
        message: "✅ Mise à jour téléchargée !",
        detail: "Dragon Store va redémarrer pour installer la nouvelle version.",
        buttons: ["REDÉMARRER"],
        defaultId: 0
    });

    if (result.response === 0) {
        autoUpdater.quitAndInstall();
    }
});

autoUpdater.on("error", (error) => {
    console.error("Erreur de mise à jour :", error);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});