/**
 * This handles the infrared sending and receiving.
 * The concrete implementation must extend from this.
 */

const { BaseClass } = require('../../lib/BaseClass');

class BaseInfraredHandler extends BaseClass {

  constructor() {
    super();
    let instance = this;
    // register the event when the game wants to trigger a shot over the ir
    this.eventHandler.gameEvents.SHOOT.on(function(player){
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
      this.eventHandler.gameEvents.IR_HIT_MESSAGE.emit({'id': data[1], 'team': data[2], 'strength': data[3]});
      return;
    }

    this.log.error('Infrared: Got not parseable ir message: '+irMsg);
  }

  sendShootMsg(playerId,teamColor,strength) {
    this.log.error("Infrared: Implement me: "+this.sendShootMsg.name);
  }
}

exports.BaseInfraredHandler = BaseInfraredHandler;