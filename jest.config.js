const projectNames = ["fen", "core"];

const projects = projectNames.map((displayName) => ({
  preset: "ts-jest",
  testEnvironment: "node",
  displayName,
  testMatch: [`<rootDir>/packages/${displayName}/src/**/*.test.{ts,tsx}`],
}));

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  projects,
  collectCoverageFrom: [`<rootDir>/packages/*/src/**/!(*.test).{ts,tsx}`],
};
