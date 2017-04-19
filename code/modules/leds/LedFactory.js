/**
 * A Factory which reads the configured display handler and returns the needed instance.
 */
class LedFactory {

  constructor() {

    const log = require('../../lib/Logger');
    const settings = require('../settings.js');
    const standards = require('../standards.js');

    if(settings.LED === standards.LED_TYPE.MOCK) {
      log.info("Led: Mock Led is configured.");
      return require('./MockLedHandler');
    }

    throw new Error('No Led configured!');

  }
}

module.exports  = new LedFactory();