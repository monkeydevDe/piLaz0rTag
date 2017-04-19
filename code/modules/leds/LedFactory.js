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

    if(settings.LED === standards.LED_TYPE.WS2812) {
      log.info("Led: WS2812 Led is configured.");
      return require('./WS2812LedHandler');
    }

    throw new Error('No Led configured!');

  }
}

module.exports  = new LedFactory();