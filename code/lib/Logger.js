const winston = require('winston')

const settings = require('./Settings');

winston.level =   settings.DEBUG_LEVEL;

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  prettyPrint: true,
  timestamp: true
});

module.exports = winston;