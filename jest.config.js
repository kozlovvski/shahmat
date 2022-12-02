const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");
const projectNames = ["fen", "core", "common"];

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths);
/** @type {import('ts-jest').JestConfigWithTsJest["projects"]} */
const projects = projectNames.map((displayName) => ({
  preset: "ts-jest",
  testEnvironment: "node",
  displayName,
  testMatch: [`<rootDir>/packages/${displayName}/src/**/*.test.{ts,tsx}`],
  modulePaths: ['<rootDir>'],
  moduleNameMapper
}));

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  projects,
  collectCoverageFrom: [`<rootDir>/packages/*/src/**/!(*.test).{ts,tsx}`],
};
