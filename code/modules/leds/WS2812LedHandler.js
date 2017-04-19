/**
 * Led Handler for mocking or if you have none :)
 */
const { BaseLedHandler } = require('./BaseLedHandler')

class WS2812LedHandler extends BaseLedHandler {

  constructor() {
    super();
    this.settings = require('../settings');
  }

  _internalMuzzleLed(on) {
    this.log.debug('Mock Led: Muzzle: '+on);
  }
}

module.exports = new WS2812LedHandler();