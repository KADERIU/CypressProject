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
      // Charger le plugin cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Implémenter d'autres écouteurs d'événements Node.js si nécessaire
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(`Launching browser: ${browser.name}`);
        return launchOptions;
      });

      return config; // Retourner la configuration modifiée
    },
  },

  env: {
    url: "https://www.campusfrance.org/fr/user/register",
  },

  // Dossier pour les vidéos et les captures d'écran
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",

  // Configuration du reporter
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true, // Ajoute des graphiques au rapport HTML
    reportFilename: "mochawesome-[datetime].html", // Format de nom pour le fichier HTML
    timestamp: "mmddyyyy_HHMMss", // Format pour les horodatages dans les noms de fichier
  },
});
