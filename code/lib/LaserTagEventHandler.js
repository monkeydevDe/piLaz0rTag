const EventEmitter = require('events');

/**
 * The event handler for the lasertag game.
 */
class LaserTagEventHandler extends EventEmitter {

  constructor(log) {

    super();
    this.log = log;

    log.info('Event: Started main LaserTagEventHandler');
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
   * Is called when the shoot button is triggered
   */
  emitShootBtn() {
    this.emitEvent('game_button_shoot');
  }

  /**
   * Is called when the game has to handle shooting
   */
  emitShoot(player) {
    this.emitEvent('game_action_shoot',player);
  }

  /**
   * Is called when the game has to reload
   */
  emitReloadBtn() {
    this.emitEvent('game_button_reload');
  }

  /**
   * Is called when reloading is done
   */
  emitReloadDone() {
    this.emitEvent('game_action_reload_done');
  }

  /**
   * Registers an event handler for the event when the user triggers the shoot button
   * @param callback
   */
  onGameButtonShoot(callback) {
    this.on('game_button_shoot',function(payload) {
      callback(payload);
    });
  }

  /**
   * Registers an event handler for the event when the user triggers the reload button
   * @param callback
   */
  onGameButtonReload(callback) {
    this.on('game_button_reload',function(payload) {
      callback(payload);
    });
  }

  /**
   * Regsiters an event handler for handling that reloading is done
   * @param callback
   */
  onGameReloadDone(callback) {
    this.on('game_action_reload_done',function(payload) {
      callback(payload);
    });
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