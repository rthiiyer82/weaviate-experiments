const path = require("path");

const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig");

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/E2ETests/steps/*.ts"],
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
    prefix: `${path.resolve("./E2ETests/")}/`,
  }),
  preset: "ts-jest",
  roots: ["<rootDir>"],
  verbose: true,
  testMatch: [
    "<rootDir>/E2ETests/**/*.steps.ts",
    "<rootDir>/E2ETests/**/?(*.)+(test).ts",
  ],
  testPathIgnorePatterns: [],
  testRunner: "jest-circus/runner",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./E2ETests/report/e2e-test-results",
        filename: "test-report.html",
        inlineSource: true,
      },
    ],
  ],
};
