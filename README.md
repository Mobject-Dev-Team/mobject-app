# Mobject Companion App

The Mobject App is intended to provide a foundation for non-realtime javascript extensions which interact with TwinCAT via ADS.

## Description

The Mobject App is an application based on the Electron.js framework. It's designed to offer a platform for non-realtime javascript extensions. With a modular design, developers can build, install, and manage extensions that communicate with TwinCAT via ADS.

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
