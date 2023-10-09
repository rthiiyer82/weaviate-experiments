const path = require("path");

const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig");

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/E2ETests/src/steps/*.ts"],
  coverageReporters: ["lcov", "text"],
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: `${path.resolve("./E2ETests/src/")}/`,
  }),
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testMatch: [
    "<rootDir>/E2ETests/src/steps/*.steps.ts",
    "<rootDir>/E2ETests/src/**/?(*.)+(test).ts",
  ],
  testPathIgnorePatterns: [],
  testRunner: "jest-circus/runner",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./E2ETests/src/report/e2e-test-results",
        filename: "test-report.html",
        inlineSource: true,
      },
    ],
  ],
};
