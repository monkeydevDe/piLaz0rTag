const winston = require('winston')

const settings = require('../modules/settings');

winston.level =   settings.DEBUG_LEVEL;


module.exports = winston;