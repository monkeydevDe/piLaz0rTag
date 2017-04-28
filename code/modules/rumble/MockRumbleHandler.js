const { BaseRumbleHandler } = require('./BaseRumbleHandler');

class MockRumbleHandler extends BaseRumbleHandler {

  constructor() {
    super();
  }

  _turnOn() {
    this.log.debug('MockRumble: turnOn');
  }

  _turnOff() {
    this.log.debug('MockRumble: turnOff');
  }

}

module.exports.MockRumbleHandler = new MockRumbleHandler();