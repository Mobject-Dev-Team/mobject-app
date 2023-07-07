const { fork } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const EventEmitter = require("events");

module.exports = class ApplicationExtensions extends EventEmitter {
  constructor(App, ExtensionsPath) {
    super();
    this.app = App;
    this.extensions = {};
    this.pendingRequests = {};
    this.nextRequestId = 1;
    this.registeredExtensions = 0;
    this.expectedExtensions = 0;
    this.extensionsLoadedPromise = new Promise((resolve, reject) => {
      this.resolveExtensionsLoaded = resolve;
      this.rejectExtensionsLoaded = reject;
    });

    this.extensionsPath = ExtensionsPath;

    if (this.app.isPackaged) {
      this.extensionsPath = path.join(
        this.app.getPath("userData"),
        this.extensionsPath
      );
    }
  }

  async initialize() {
    await this.ensureExtensionPathExists();
    await this.loadFromPath(this.extensionsPath);
  }

  async ensureExtensionPathExists() {
    try {
      await fs.access(this.extensionsPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.mkdir(this.extensionsPath, { recursive: true });
      } else {
        throw error;
      }
    }
  }

  async loadSingleExtension(dirPath, dir, attempt = 0) {
    const indexFile = path.join(dirPath, `${dir}.extension.js`);

    try {
      await fs.access(indexFile);
      this.expectedExtensions++;
      const extensionProcess = fork(indexFile);

      let extension = null;

      extensionProcess.on("message", (msg) => {
        if (msg.type === "register") {
          extension = msg;
          this.extensions[extension.indexGroup] = extensionProcess;
          this.registeredExtensions++;
          this.emit("extensionRegistered", extension);

          if (this.registeredExtensions === this.expectedExtensions) {
            this.resolveExtensionsLoaded();
          }
        } else if (
          msg.type === "response" &&
          this.pendingRequests[msg.requestId]
        ) {
          const { resolve } = this.pendingRequests[msg.requestId];
          resolve(msg.response);
          delete this.pendingRequests[msg.requestId];
        }
      });

      // Handle child process crash
      extensionProcess.on("exit", (code, signal) => {
        if (signal) {
          console.error(`Extension process was killed by signal: ${signal}`);
        }
        if (code !== null && code !== 0) {
          console.error(`Extension process exited with error code: ${code}`);
        }

        // Emit extensionClosed event
        if (extension !== null) {
          this.emit("extensionTerminated", extension);
        }

        // Restart the extension
        if (code !== null || signal) {
          const delay = Math.min(2 ** attempt * 1000, 30000); // Delay capped at 30 seconds
          console.log(`Restarting extension ${dir} in ${delay}ms`);
          setTimeout(() => {
            this.loadSingleExtension(dirPath, dir, attempt + 1).catch((err) => {
              console.error(`Failed to restart extension ${dir}: `, err);
            });
          }, delay);
        }
      });
    } catch (e) {
      console.error(`Failed to load extension at ${indexFile}: `, e);
    }
  }

  async loadFromPath(directory) {
    const dirs = await fs.readdir(directory);
    const promises = dirs.map(async (dir) => {
      const dirPath = path.join(directory, dir);
      const stats = await fs.stat(dirPath);
      if (stats.isDirectory()) {
        return this.loadSingleExtension(dirPath, dir);
      }
    });

    await Promise.all(promises);

    return this.extensionsLoadedPromise;
  }

  async handleRequest(req) {
    try {
      await this.extensionsLoadedPromise;
      const extension = this.extensions[req.indexGroup];

      if (!extension) {
        throw new Error(
          `No extension registered for index group ${req.indexGroup}`
        );
      }

      const requestId = this.nextRequestId++;
      this.pendingRequests[requestId] = {};
      extension.send({ ...req, type: "request", requestId });

      return new Promise((resolve, reject) => {
        this.pendingRequests[requestId] = { resolve, reject };
      });
    } catch (err) {
      console.error("Failed to handle request: ", err);
      throw err;
    }
  }
};
