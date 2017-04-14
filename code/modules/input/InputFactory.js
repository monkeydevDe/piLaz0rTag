/**
 * A Factory which reads the configured input handler and returns the needed instance.
 */
class InputFactory {

  constructor() {

    const log = require('../../lib/Logger');

    const settings = require('../settings.js');
    const standards = require('../standards.js');

    if(settings.INPUT === standards.INPUT_TYPE.KEYBOARD) {
      log.info("Keyboard input is configured.");
      const { KeyboardInput } = require('./KeyboardInput');
      return new KeyboardInput();
    }

    throw new Error('No input handler configured!');
  }
}

module.exports  = new InputFactory();