// eslint-disable-next-line import/no-unresolved
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './test',
  use: {
    baseURL: 'http://localhost:3000', // or your local dev URL
    headless: true,
  },
  webServer: {
    command: 'npm run dev', // or `npx @adobe/helix-cli up`
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
