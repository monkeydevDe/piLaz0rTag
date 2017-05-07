/**
 * Led Handler for mocking or if you have none :)
 */
const { BaseLedHandler } = require('./BaseLedHandler')

class MockLedHandler extends BaseLedHandler {

  constructor() {
    super();
  }

  _internalMuzzleLed(on) {
    this.log.debug('Mock Led: Muzzle: '+on);
  }

  setStatusOnReceiverLeds(game,on) {
    
  }
}

module.exports = new MockLedHandler();