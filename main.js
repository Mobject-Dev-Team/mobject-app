const { app } = require("electron");
const ApplicationExtensions = require("./src/applicationExtensions");
const { Server } = require("ads-server");
const TrayManager = require("./src/tray");
const AppMediator = require("./src/appMediator");

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

const appExtensions = new ApplicationExtensions(app, "./extensions");
const adsServer = new Server({ localAdsPort: 27272 });
const trayManager = new TrayManager(app);
const appMediator = new AppMediator(appExtensions, adsServer, trayManager);

app.whenReady().then(async () => {
  try {
    appMediator.initialize();
    trayManager.initialize();
    await appExtensions.initialize();
    await adsServer.connect();
  } catch (error) {
    console.error("Error initializing:", error);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.setAboutPanelOptions({
  applicationName: "Mobject App",
  applicationVersion: app.getVersion(),
  copyright: "Copyright © 2023 Mobject.org",
  authors: ["mobject dev team"],
});
