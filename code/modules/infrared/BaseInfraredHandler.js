/**
 * This handles the infrared sending and receiving.
 * The concrete implementation must extend from this.
 */
class BaseInfraredHandler {

  constructor() {
    this.log = require('../../lib/Logger');
    this.eventHandler = require('../../lib/LaserTagEventHandler');

    const instance = this;

    this.eventHandler.on('game_button_shoot',function(){
      instance.sendShootMsg()
    });
    
  }

  handleIncomingMsg(irMsg) {
    this.eventHandler.emitIrReceivedMsg(irMsg);
  }

  sendShootMsg(playerId,teamColor,strength) {
    this.log.error("Implement me");
  }
}

exports.BaseInfraredHandler = BaseInfraredHandler;