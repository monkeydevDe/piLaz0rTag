const EventEmitter = require('events');
const {Event} = require('./Event');

/**
 * The event handler for the lasertag game.
 */
class LaserTagEventHandler extends EventEmitter {

  constructor(){
    super();
    this.log = require('./Logger.js');
    this.settings = require('../modules/settings');

    this.log.info('Event: Started main LaserTagEventHandler');


    /**
     * Register the events which handle the main loop like DISPLAY_SETUP game mode etc
     */
    this.mainEvents = {
      //When the main class changes its state payload is the state of the game
      STATE_CHANGED: null,
      // When something needs the main state this event can be emitted and has to listen fo the STATE_CHANGED
      GET_STATE: null,
      // when to setup a game
      GAME_SETUP: null,
      // when the game starts
      GAME_STARTED: null,
      // stops the current game
      GAME_STOP: null
    };
    this._createEvents('MAIN', this.mainEvents);

    /**
     * Register the events for websocket stuff
     */
    this.webSocketEvents = {
      // When the websocket received a message of the type: socketMessage
      SOCKET_MESSAGE_RECEIVED: null
    }
    this._createEvents('WS', this.webSocketEvents);

    /**
     * Register events when a button is triggered by the input
     */
    this.buttonEvents = {
      // when the shoot button is triggered
      SHOOT_BTN: null,
      // when the reload button is triggerd
      RELOAD_BTN: null
    }
    this._createEvents('BUTTON', this.buttonEvents);


    this.gameEvents = {
      // when somebody wants to know the current status of the game
      GET_STATUS: null,
      // when the game starts
      STARTED: null,
      // when to actual shoot we have to send an ir signal etc.
      SHOOT: null,
      // when reloading is done
      RELOAD_FINISHED: null,
      // Is called when the player respawning is done
      PLAYER_RESPAWNED: null,
      // Is called when the player received a ir hit message payload: {'id': playerId, 'team': playerTeam, 'strength': strength}
      IR_HIT_MESSAGE: null,
      // Is called when the data in the game has changed like health, magazine, lives etc
      GAME_DATA_UPDATE: null,
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
      events[eventName] = new Event(prefix + '_' + eventName, this);
    }
  }
}

module.exports = new LaserTagEventHandler();