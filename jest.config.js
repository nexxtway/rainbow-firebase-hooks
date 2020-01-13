module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['node_modules/', 'lib/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./scripts/setup-jest-tests.js'],
};
