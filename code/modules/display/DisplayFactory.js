/**
 * A Factory which reads the configured display handler and returns the needed instance.
 */
class DisplayFactory {

  constructor() {

    const log = require('../../lib/Logger');

    const settings = require('../settings.js');
    const standards = require('../standards.js');

    if(settings.DISPLAY === standards.DISPLAY_TYPE.WEB) {
      log.info("Display: Web display is configured.");
      return require('./WebSocketDisplay');
    }

    throw new Error('No Display configured!');

  }
}

module.exports  = new DisplayFactory();