module.exports = {
  appId: process.env.APP_ID || 'ApplicationId',
  key: process.env.KEY || 'XXXXXXXXXXXXXXX',
  secret: process.env.SECRET || 'xxxxxxxxxxxxxxxxxxxxxxxxx',
  alias: process.env.ALIAS || 'Server',
  targetAlias : process.env.TARGET_ALIAS || 'Device',
  port: process.env.PORT || 80
};
