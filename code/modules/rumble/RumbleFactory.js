/**
 * A Factory which reads the configured display handler and returns the needed instance.
 */
class RumbleFactory {

  constructor() {

    const log = require('../../lib/Logger');
    const settings = require('../settings.js');
    const standards = require('../standards.js');

    if(settings.RUMBLE === standards.RUMBLE_TYPE.MOCK) {
      log.info('Rumble: Mock Rumble is configured.');
      return require('./MockRumbleHandler');
    }

    if(settings.RUMBLE === standards.RUMBLE_TYPE.MOTOR) {
      log.info('Rumble: Motor is configured.');
      return require('./MotorRumbleHandler');
    }

    if(settings.RUMBLE === standards.RUMBLE_TYPE.WEB) {
      log.info('Rumble: Web is configured.');
      return require('./WebSocketRumbleHandler');
    }

    throw new Error('No Rumble configured!');

  }
}

module.exports  = new RumbleFactory();