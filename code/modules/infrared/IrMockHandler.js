/**
 * Handles the ir signals via lircd
 */
const {BaseInfraredHandler} = require('./BaseInfraredHandler.js');

class IrMockHandler extends BaseInfraredHandler {

  constructor() {
    super();

    this.log.info('Mocking Infrared handling');
  }
      
  sendShootMsg(playerId, teamColor, strength) {
      const instance = this;
      instance.log.info('IR Mock handler: shoot ' + playerId + teamColor + strength);
  };
}

module.exports.IrMockHandler = new IrMockHandler();