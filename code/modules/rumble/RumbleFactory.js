/**
 * A Factory which reads the configured display handler and returns the needed instance.
 */
class RumbleFactory {

  constructor() {

    const log = require('../../lib/Logger');
    const settings = require('../settings.js');
    const standards = require('../standards.js');

    if(settings.RUMBLE === standards.RUMBLE_TYPE.MOCK) {
      log.info("Rumble: Mock Rumble is configured.");
      return require('./MockRumbleHandler');
    }

    /*if(settings.RUMBLE === standards.RUMBLE_TYPE.MOTOR) {
      log.info("Rumble: Motor is configured.");
      return require('./WS2812LedHandler');
    } */

    throw new Error('No Led configured!');

  }
}

module.exports  = new RumbleFactory();