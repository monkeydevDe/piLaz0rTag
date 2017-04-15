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
   * When the main class changes its state
   * @param state
   */
  emitCurrentMainStateChange(state) {
    this.emitEvent('main_state_change', state);
  }

  /**
   * Handler for handling main state changed.
   * @param callback
   */
  onCurrentMainStateChange(callback) {
    this.on('main_state_change',function(state) {
      callback(state);
    })
  }

  /**
   * When the main class changes its state
   * @param state
   */
  emitGetMainState() {
    this.emitEvent('main_get_state');
  }

  /**
   * Handler for handling main state changed.
   * @param callback
   */
  onGetMainState(callback) {
    this.on('main_get_state',function() {
      callback();
    })
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
   * Is called when respawning is done
   */
  emitRespawningDone() {
    this.emitEvent('game_player_respawning_done');
  }

  /**
   * Event handler when the respawning is done.
   * @param callback
   */
  onRespawningDone(callback) {
    this.on('game_player_respawning_done',function() {
      callback();
    });
  }

  /**
   * Emits the event that the display has to update the game status.
   * @param game
   */
  emitDisplayGameUpdate(game) {
    this.emitEvent('game_display_game_update',game);
  }

  /**
   * Emits the event when some module requests the game status.
   */
  emitGameGetStatus() {
    this.emitEvent('game_get_status');
  }

  /**
   * This event is emitted when the player got a hit message.
   * The game will watch on this event and will decide what to do with it.
   * @param playerId
   * @param playerTeam
   * @param strength
   */
  emitGamePlayerHit(playerId,playerTeam,strength) {
    this.emitEvent('game_player_hit',{'id' : playerId, 'team' : playerTeam, 'strength' : strength});
  }

  /**
   * Register an event handler for the player hit event this should be done by the BaseGame.
   * @param callback
   */
  onGamePlayerHit(callback) {
    this.on('game_player_hit', function(payload) {
       callback(payload)
    });
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
   * When the game actually wants to shoot.
   * We need to send ir signal and so on.
   * @param callback
   */
  onGameShoot(callback) {
    this.on('game_action_shoot',function(player){
      callback(player);
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
   * Regsiter an event handler for handling that reloading is done
   * @param callback
   */
  onGameReloadDone(callback) {
    this.on('game_action_reload_done',function(payload) {
      callback(payload);
    });
  }

  onDisplayGameUpdate(callback) {
    this.on('game_display_game_update', function(game) {
       callback(game);
    });
  }

  /**
   * Register event handler on game_get_status
   * @param callback
   */
  onGameStatus(callback) {
    this.on('game_get_status',function() {
      callback();
    })
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