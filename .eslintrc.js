
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  "extends": ["wesbos"],
  rules: {
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: ['src/*.stories.js', 'stories/**'],
      },
    ],
  },
}