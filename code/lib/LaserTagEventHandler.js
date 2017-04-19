const EventEmitter = require('events');
const {Event} = require('./Event');

/**
 * The event handler for the lasertag game.
 */
class LaserTagEventHandler extends EventEmitter {

  constructor(log) {

    super();
    this.log = require('./Logger.js');
    this.log.info('Event: Started main LaserTagEventHandler');


    /**
     * Register the events which handle the main loop like DISPLAY_SETUP game mode etc
     * @type {{STATE_CHANGED: null, GET_STATE: null}}
     */
    this.mainEvents = {
      //When the main class changes its state payload is the state of the game
      STATE_CHANGED: null,
      // When something needs the main state this event can be emitted and has to listen fo the STATE_CHANGED
      GET_STATE: null
    };
    this._createEvents('MAIN', this.mainEvents);

    /**
     * Register the events for websocket stuff
     * @type {{SOCKET_MESSAGE_RECEIVED: null}}
     */
    this.webSocketEvents = {
      // When the websocket received a message of the type: socketMessage
      SOCKET_MESSAGE_RECEIVED: null
    }
    this._createEvents('WS', this.webSocketEvents);

    /**
     * Register events when a button is triggered by the input
     * @type {{SHOOT: null}}
     */
    this.buttonEvents = {
      // when the shoot button is triggerd
      SHOOT_BTN: null
    }
    this._createEvents('BUTTON', this.buttonEvents);


    this.gameEvents = {
      // when to actual shoot we have to send an ir signal etc.
      SHOOT: null
    }
    this._createEvents('GAME', this.gameEvents);
    
  }

  /**
   * Creates the actual events for the given prefix and events list
   * @param prefix the prefix for the event name
   * @param events the list of events to register
   * @private
   */
  _createEvents(prefix, events) {
    for(let eventName in events) {
      this.log.error(eventName);
      events[eventName] = new Event(prefix + '_' + eventName, this);
    }
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
   * Is called when the game is starting
   */
  emitStartGame() {
    this.emitEvent('game_start');
  }

  onStartGame(callback) {
    this.on('game_start', function() {
      callback();
    });
  }

  /**
   * Is called when the game is starting
   */
  emitSetupGame(gameSetupData) {
    this.emitEvent('game_setup', gameSetupData);
  }

  onSetupGame(callback) {
    this.on('game_setup', function(gameData) {
      callback(gameData);
    });
  }

  /**
   * Is called when the game is to stop
   */
  emitStopGame() {
    this.emitEvent('game_stop');
  }

  onStopGame(callback) {
    this.on('game_stop', function() {
      callback();
    });
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
    this.on('game_player_respawning_done', function() {
      callback();
    });
  }

  /**
   * Emits the event that the display has to update the game status.
   * @param game
   */
  emitDisplayGameUpdate(game) {
    this.emitEvent('game_display_game_update', game);
  }


  /**
   * This event is emitted when the player got a hit message.
   * The game will watch on this event and will decide what to do with it.
   * @param playerId
   * @param playerTeam
   * @param strength
   */
  emitGamePlayerHit(playerId, playerTeam, strength) {
    this.emitEvent('game_player_hit', {'id': playerId, 'team': playerTeam, 'strength': strength});
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
   * Registers an event handler for the event when the user triggers the reload button
   * @param callback
   */
  onGameButtonReload(callback) {
    this.on('game_button_reload', function(payload) {
      callback(payload);
    });
  }

  /**
   * Regsiter an event handler for handling that reloading is done
   * @param callback
   */
  onGameReloadDone(callback) {
    this.on('game_action_reload_done', function(payload) {
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
    this.on('game_get_status', function() {
      callback();
    })
  }

  /**
   * Emits an event
   * @param eventName the name of the event
   * @param payload the payload of the event
   */
  emitEvent(eventName, payload) {
    this.log.info('Event: ' + eventName);
    this.emit(eventName, payload);
  }

}

module.exports = new LaserTagEventHandler();