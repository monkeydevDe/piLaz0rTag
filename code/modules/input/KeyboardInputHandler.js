/**
 * Input over a keyboard device
 * https://www.sitepoint.com/node-js-best-practices-from-the-node-gurus/
 */
const { BaseInputHandler } = require('./BaseInputHandler');

class KeyboardInputHandler extends BaseInputHandler {
  constructor() {

    super();

    const keypress = require('keypress');

    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
      log.line('got "keypress" '+key);
      // do something here
    });
  }
}

module.exports.KeyboardInputHandler = new KeyboardInputHandler();