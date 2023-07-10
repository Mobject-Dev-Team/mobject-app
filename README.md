<p align="center">
  <img width="160"  src="./docs/images/logo.svg">
</p>

# mobject-app

The mobject companion app is an application based on the Electron.js framework. It's designed to offer a platform for non-realtime javascript extensions. With a modular design, developers can build, install, and manage extensions that communicate with TwinCAT via ADS.

## Description

The mobject companion app is an Electron-based application that complements the Mobject library. Mobject is a set of open-source OOP-style libraries written in structured text, intended to extend functionality to PLC programs within the TwinCAT environment.

The mobject companion app acts as an ADS server to which a TwinCAT runtime can send requests. It listens for incoming requests, checks the request's index (part of the ADS protocol to identify the message's intended recipient) and inspects whether any extensions have been loaded to handle that particular index. If an extension is identified, the request is passed to the extension via IPC, with the extension residing in its own child-process. The extension can then process the request as needed, and any reply is returned to the app and forwarded back to TwinCAT.

In addition to managing the lifecycle of the extensions and the ADS server, Mobject Companion App also provides a system tray icon indicating the connection status, and robust error handling.

## Installation

Before you start the installation process, make sure that Node.js and npm are installed on your system. You can download them here.

```bash
# Clone the repository
git clone https://github.com/Mobject-Dev-Team/mobject-app.git
cd mobject-app

# Install dependencies
npm install
```

## Developing

It is best to open the folder using vscode and pressing run from there. Alternatively you can use the npm start.

Remember, when running this way your extensions must be placed in the extensions folder.

```bash
# Starting the app
npm start
```

## Building the app

If you wish to build the app so that it runs as an executable, use the following command. The build files will be in the dist folder.

Remember, when running this way your extensions must be placed in the %AppData%\mobject-app\extensions folder.

```bash
# Build the app
npm run build
```

## Documentation

To follow soon...
