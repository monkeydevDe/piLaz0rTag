/**
 * This handles the infrared sending and receiving.
 * The concrete implementation must extend from this.
 */
class BaseInfraredHandler {

  constructor() {
    this.log = require('../../lib/Logger');
    this.eventHandler = require('../../lib/LaserTagEventHandler');

    const instance = this;

    this.eventHandler.onGameShoot(function(player){
      instance.sendShootMsg(player.id,player.team,player.shootStrength);
    });
  }

  /**
   * This is called when the ir handler implementation received an ir signal.
   * @param irMsg
   */
  handleIncomingMsg(irMsg) {
    this.eventHandler.emitIrReceivedMsg(irMsg);
  }

  sendShootMsg(playerId,teamColor,strength) {
    this.log.error("Implement me");
  }
}

exports.BaseInfraredHandler = BaseInfraredHandler;