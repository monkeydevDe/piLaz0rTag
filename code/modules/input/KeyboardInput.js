/**
 * Input over a keyboard device
 * https://www.sitepoint.com/node-js-best-practices-from-the-node-gurus/
 */
class KeyboardInput {
  constructor() {

    const keypress = require('keypress');
    const log = require('../../lib/Logger');

    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
      log.line('got "keypress" '+key);
      // do something here
    });
  }
}

exports.KeyboardInput = KeyboardInput;