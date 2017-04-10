/**
 * Input over a keyboard device
 * https://www.sitepoint.com/node-js-best-practices-from-the-node-gurus/
 */
exports = module.exports = keyboardInput;

function keyboardInput (log,settings) {


  var keypress = require('keypress');

  keypress(process.stdin);

  process.stdin.on('keypress', function (ch, key) {
    log.line('got "keypress"', key);
     // do something here
  });
}