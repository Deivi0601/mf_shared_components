const librariesToRemove = [
  "@angular/platform-browser",
  "@angular/platform-browser/animations",
  "@angular/platform-browser/testing",
  "@angular/platform-browser-dynamic",
  "@angular/platform-browser-dynamic/testing",
  "@angular/animations/browser",
  "@angular/animations/browser/testing",
];

const removeLib = (shared) =>
  librariesToRemove.forEach((lib) => delete shared?.[lib]);

const initWebPackFederation = ({
  name = "",
  exposes = {
    "./AppComponent": "./src/app/app.component.ts",
    "./routes": "./src/app/app.routes.ts",
  },
}) => {
  const {
    shareAll,
    withModuleFederationPlugin,
  } = require("@angular-architects/module-federation/webpack");

  const shared = {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: "auto",
    }),
  };

  removeLib(shared);

  return withModuleFederationPlugin({
    name,
    exposes,
    shared: {
      ...shared,
    },
  });
};

module.exports = {
  removeLib,
  initWebPackFederation,
};
