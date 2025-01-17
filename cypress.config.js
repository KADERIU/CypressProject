const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base URL pour simplifier les `cy.visit()`
    baseUrl: "https://www.campusfrance.org/fr/user/register",

    // Configuration des répertoires
    specPattern: "cypress/e2e/**/*.cy.js",
    fixturesFolder: "cypress/fixtures",
    supportFile: "cypress/support/e2e.js",

    // Paramètres globaux
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 870,

    setupNodeEvents(on, config) {
      // Implémenter les écouteurs d'événements Node.js si nécessaire
      // Exemple : ajout d'un event listener
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(`Launching browser: ${browser.name}`);
        return launchOptions;
      });
    },
  },

  env: {
    url: "https://www.campusfrance.org/fr/user/register",
  },

  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",

  reporter: "spec",
  reporterOptions: {
    mochaFile: "cypress/results/results-[hash].xml",
    toConsole: true,
  },
});
