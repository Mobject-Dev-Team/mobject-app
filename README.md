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

Before you start the installation process, make sure that Node.js and npm are installed on your system.

```bash
# Clone the repository
git clone https://github.com/Mobject-Dev-Team/mobject-app.git
cd mobject-app

# Install dependencies
npm install
```

# Developing

We recommend utilizing Visual Studio Code (VS Code) for an optimal development experience. With pre-configured launch settings, it is as easy as opening the project folder in VS Code and clicking on the 'Run' command.

To enable this, simply add a folder called .vscode and create a launch.json with the following content.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."],
      "outputCapture": "std"
    }
  ]
}
```

You can also initiate the application by executing 'npm start' in the command line interface.

Please note, when utilizing these methods, ensure to place your extensions within the 'extensions' directory of this folder.

```bash
# Starting the app
npm start
```

## Building the app

To compile the application into a standalone executable, execute the following command. This process generates build files which can be found in the 'dist' directory.

Ensure that when running the compiled application, your extensions are positioned in the '%AppData%\mobject-app\extensions' directory.

```bash
# Command to build the application
npm run build
```

## Documentation

To follow soon...
