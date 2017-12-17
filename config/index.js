const config = (() => {
  try {
    return require('./config');
  } catch(error) {
    console.log('unable to find local configuration, falling back to default configuration');
    return require('./config.default');
  }
})();

module.exports = config;
