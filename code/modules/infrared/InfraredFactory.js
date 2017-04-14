/**
 * A Factory which reads the configured infrared handler and returns the needed instance.
 */
class InfraredFactory {

  constructor() {

    const log = require('../../lib/Logger');

    const settings = require('../settings.js');

    if(settings.INFRARED === "lircd") {
      log.info("LIRCD infrared is configured.");
      const { LircdInfraredHandler } = require('./LircdInfraredHandler.js');
      return new LircdInfraredHandler(log);
    }

    throw new Error('No infrared handle configured!');

  }
}

module.exports  = new InfraredFactory();