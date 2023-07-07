const { Menu, Tray } = require("electron");
const path = require("path");

module.exports = class TrayManager {
  constructor(app) {
    this.app = app;
    this.trayImageConnected = path.join(__dirname, "../assets/logo-green.png");
    this.trayImageConfig = path.join(__dirname, "../assets/logo-blue.png");
    this.trayImageException = path.join(__dirname, "../assets/logo-yellow.png");
    this.trayImageDisconnected = path.join(__dirname, "../assets/logo-red.png");
    this.tray = null;
    this.extensionsMenuItems = [];
  }

  createContextMenu() {
    return Menu.buildFromTemplate([
      {
        label: "About",
        click: () => {
          this.app.setAboutPanelOptions({
            applicationName: "Mobject App",
            applicationVersion: this.app.getVersion(),
            copyright: "Copyright © 2023 Mobject.org",
            authors: ["mobject dev team"],
          });
          this.app.showAboutPanel();
        },
      },
      {
        label: "Extensions",
        submenu: this.extensionsMenuItems,
      },
      {
        label: "Close",
        click: () => this.app.quit(),
      },
    ]);
  }

  initialize() {
    this.setTrayDisconnected();
  }

  updateTrayIcon(trayImage, toolTip) {
    if (!this.tray) {
      this.tray = new Tray(trayImage);
    } else {
      this.tray.setImage(trayImage);
    }
    this.tray.setToolTip("MobjectApp - " + toolTip);
    this.tray.setContextMenu(this.createContextMenu());
  }

  setTrayConnected() {
    this.updateTrayIcon(this.trayImageConnected, "Connected");
  }

  setTrayConfig() {
    this.updateTrayIcon(this.trayImageConfig, "Config");
  }

  setTrayException() {
    this.updateTrayIcon(this.trayImageException, "Exception");
  }

  setTrayDisconnected() {
    this.updateTrayIcon(this.trayImageDisconnected, "Disconnected");
  }

  addExtensionToMenu(extension) {
    this.extensionsMenuItems.push({
      label: extension.name,
      click: () => {
        this.app.setAboutPanelOptions({
          applicationName: "Mobject App Extension - " + extension.name,
          applicationVersion: extension.version,
        });
        this.app.showAboutPanel();
      },
    });
    this.updateTrayIcon(this.trayImageDisconnected);
  }

  removeExtensionFromMenu(extension) {
    const index = this.extensionsMenuItems.findIndex(
      (menuItem) => menuItem.label === extension.name
    );

    if (index !== -1) {
      this.extensionsMenuItems.splice(index, 1);
    }

    this.updateTrayIcon(this.trayImageDisconnected);
  }
};
