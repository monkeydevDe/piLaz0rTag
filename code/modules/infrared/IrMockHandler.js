/**
 * Handles the ir signals via lircd
 */
const {BaseInfraredHandler} = require('./BaseInfraredHandler.js');

class IrMockHandler extends BaseInfraredHandler {

  constructor() {
    super();

    this.log.info('Mocking Infrared handling');

    // when a callback is called this holds the current instance
    const instance = this;
  }
      
  sendShootMsg(playerId, teamColor, strength) {
      const instance = this;
      instance.log.info('IR Mock handler: shoot ' + playerId + teamColor + strength);
  };
}

exports.IrMockHandler = IrMockHandler;