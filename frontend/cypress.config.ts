import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1090,
  viewportHeight: 1244,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require("./cypress/plugins/index.js")(on, config)
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
