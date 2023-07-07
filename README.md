# Mobject Companion App

The Mobject App is intended to provide a foundation for non-realtime javascript extensions which interact with TwinCAT via ADS.

## Description

The Mobject App is an application based on the Electron.js framework. It's designed to offer a platform for non-realtime javascript extensions. With a modular design, developers can build, install, and manage extensions that communicate with TwinCAT via ADS.

## Installation

Before you start the installation process, make sure that Node.js and npm are installed on your system. You can download them here.

```bash
Copy code
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
