module.exports = {
  modulePaths: [
    '<rootDir>/src/',
  ],
  setupFiles: [
    '<rootDir>/tests/shim.js',
    '<rootDir>/tests/setup.js',
    'jest-canvas-mock',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
}
