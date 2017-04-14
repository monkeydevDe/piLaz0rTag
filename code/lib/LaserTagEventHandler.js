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
    this.emitEvent('websocket_received', socketMsg);
  }

  /**
   * Is called when the game has to shoot
   */
  emitShoot() {
    this.emitEvent('game_button_shoot');
  }

  /**
   * Is called when the game has to reload
   */
  emitReload() {
    this.emitEvent('game_reload');
  }

  /**
   * Emits an event
   * @param eventName the name of the event
   * @param payload the payload of the event
   */
  emitEvent(eventName,payload) {
    this.log.info('Event: '+eventName);
    this.emit(eventName,payload);
  }
}

const log = require('./Logger.js');
module.exports = new LaserTagEventHandler(log);