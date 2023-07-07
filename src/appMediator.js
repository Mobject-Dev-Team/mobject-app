module.exports = class AppMediator {
  constructor(appExtensions, adsServer, trayManager) {
    this.appExtensions = appExtensions;
    this.adsServer = adsServer;
    this.trayManager = trayManager;
  }

  initialize() {
    this.appExtensions.on(
      "extensionRegistered",
      this.handleExtensionRegistered.bind(this)
    );

    this.appExtensions.on(
      "extensionTerminated",
      this.handleExtensionTerminated.bind(this)
    );

    this.adsServer.on("connect", this.handleConnect.bind(this));
    this.adsServer.on("disconnect", this.handleDisconnect.bind(this));
    this.adsServer.on("reconnect", this.handleReconnect.bind(this));
    this.adsServer.on("connectionLost", this.handleConnectionLost.bind(this));

    this.adsServer.onReadWriteReq(this.handleReadWriteReq.bind(this));
  }

  handleExtensionRegistered(extension) {
    this.trayManager.addExtensionToMenu(extension);
  }

  handleExtensionTerminated(extension) {
    this.trayManager.removeExtensionFromMenu(extension);
  }

  handleConnect(connection) {
    this.trayManager.setTrayConnected();
  }

  handleDisconnect() {
    this.trayManager.setTrayDisconnected();
  }

  handleReconnect() {
    this.trayManager.setTrayConnected();
  }

  handleConnectionLost() {
    this.trayManager.setTrayDisconnected();
  }

  handleReadWriteReq(req, res) {
    this.appExtensions
      .handleRequest(req)
      .then((response) => {
        if (response.data) {
          response.data = Buffer.from(response.data);
        }
        res(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
