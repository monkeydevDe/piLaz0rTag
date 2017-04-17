/**
 * A Factory which reads the configured infrared handler and returns the needed instance.
 */
class InfraredFactory {

  constructor() {

    const log = require('../../lib/Logger');

    const settings = require('../settings.js');
    const standards = require('../standards.js');
 
    if(settings.INFRARED === standards.INFRARED_TYPE.LIRCD) {
      log.info("Infrared: LIRCD infrared is configured.");
      const { LircdInfraredHandler } = require('./LircdInfraredHandler.js');
      return new LircdInfraredHandler();
    }

    if(settings.INFRARED === standards.INFRARED_TYPE.IRMOCK) {
      log.info("Infrared: MOCK is configured.");
      const { IrMockHandler } = require('./IrMockHandler.js');
      return new IrMockHandler();
    }

    throw new Error('No infrared handler configured!');

  }
}

module.exports  = new InfraredFactory();