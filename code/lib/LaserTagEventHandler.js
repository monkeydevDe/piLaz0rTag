const EventEmitter = require('events');

/**
 * The event handler for the lasertag game.
 */
class LaserTagEventHandler extends EventEmitter {

  constructor(log) {

    super();
    this.log = log;

    log.info('Started main LaserTagEventHandler');
  }

  /**
   * This emits the event when a ir message was received
   * @param irMsg
   */
  emitIrReceivedMsg(irMsg) {
    this.emit('ir_received', irMsg);
  }


  /**
   * This emits a websocket msg received msg
   * @param socketMsg
   */
  emitWebsocketMsg(socketMsg) {
    this.emit('websocket_received', socketMsg);
  }

  /**
   * Is called when the game has to shoot
   */
  emitShoot() {
    this.log.info('Event: game_shoot');
    this.emit('game_shoot');
  }
}

const log = require('./Logger.js');
module.exports = new LaserTagEventHandler(log);