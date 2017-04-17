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

    if(irMsg.startsWith('shoot_') == true) {
      this.log.debug('Infrared: Got shoot message: '+irMsg);
      var data = irMsg.split('_');
      this.eventHandler.emitGamePlayerHit(data[1],data[2],data[3]);
      return;
    }

    this.log.error('Infrared: Got not parseable ir message: '+irMsg);

  }

  sendShootMsg(playerId,teamColor,strength) {
    this.log.error("Infrared: Implement me");
  }
}

exports.BaseInfraredHandler = BaseInfraredHandler;