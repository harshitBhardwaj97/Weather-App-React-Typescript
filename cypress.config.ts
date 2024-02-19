import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000, // Increased global timeout to 10 seconds
  },
  projectId: "t6srp4",
});
