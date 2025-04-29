  module.exports = {
    reporters: [
      'default',
      ['jest-junit', {
        outputDirectory: '.',
        outputName: 'test-results.xml'
      }]
    ],
  };