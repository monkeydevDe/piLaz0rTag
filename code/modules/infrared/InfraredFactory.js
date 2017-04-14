/**
 * A Factory which reads the configured infrared handler and returns the needed instance.
 */
class InfraredFactory {

  constructor() {

    const log = require('../../lib/Logger');

    const settings = require('../settings.js');
    const standards = require('../standards.js');

    if(settings.INFRARED === standards.INFRARED_TYPE.LIRCD) {
      log.info("LIRCD infrared is configured.");
      const { LircdInfraredHandler } = require('./LircdInfraredHandler.js');
      return new LircdInfraredHandler();
    }

    throw new Error('No infrared handler configured!');

  }
}

module.exports  = new InfraredFactory();