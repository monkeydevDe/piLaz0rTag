/**
 * The actual main class of the PiLazorTag
 */
const {BaseClass} = require('./BaseClass');

// TODO Perhaps put this in a factory like for games
const {MasterState} = require('./states/MasterState');
const {ClientState} = require('./states/ClientState');
const {StartGameState} = require('./states/StartGameState');
const {GameRunningState} = require('./states/GameRunningState');



class PiLazorTag extends BaseClass {

  constructor() {

    super();

    this.log.info('PiLazorTag: Starting main game handler.');

    if (this.settings.DEBUG_LEVEL) {
      this.log.info('===============================================');
      //Loop over all Settings
      for (let vars in this.settings.modules)
        this.log.info(vars + ': ' + this.settings.modules[vars]);
      this.log.info('===============================================');
    }

    this.moduleRegistry = require('./ModulesRegistry');
    this.webserver = require('../modules/web/Webserver');
    this.websocketMsgHandler = require('./WebSocketGameMsgHandler');
    this.mainStates = require('./MainStates');


    // the current status of the main game
    this.currentState = this.mainStates.SELECT_MODE;

    // when a state client/master/setup is set it is holded here
    this.currentStateInstance = null;

    const instance = this;


    this.eventHandler.mainEvents.GET_STATE.on(function () {
      instance.emitCurrentState();
    });


    this.eventHandler.mainEvents.CHANGE_STATE.on(function (stateData) {
      instance._changeState(stateData);
    });

  }

  /**
   * Will change the state
   */
  _changeState(stateData) {

    const stateToSet = stateData.state;

    this.currentState = null;
    if(this.currentStateInstance !== undefined && this.currentStateInstance !== null) {
      this.currentStateInstance.cleanUpEvents();
      this.currentStateInstance.internalCleanup();
    }
    this.currentStateInstance = null;
    delete this.currentStateInstance;

    if (stateToSet === this.mainStates.MASTER_MODE) {
      this.currentStateInstance = new MasterState();
      this.currentState = this.mainStates.MASTER_MODE;
    }

    if (stateToSet === this.mainStates.CLIENT_MODE) {
      this.currentStateInstance = new ClientState(stateData.data.host);
      this.currentState = this.mainStates.CLIENT_MODE;
    }

    if(stateToSet === this.mainStates.GAME_STARTING) {
      this.currentStateInstance = new StartGameState(stateData.data);
      this.currentState = this.mainStates.GAME_STARTING;
    }

    if(stateToSet === this.mainStates.GAME_RUNNING) {
      this.currentStateInstance = new GameRunningState(stateData.data);
      this.currentState = this.mainStates.GAME_RUNNING;
    }

    if (stateToSet === this.mainStates.SELECT_MODE) {
      this.currentState = this.mainStates.SELECT_MODE;
    }

    if (this.currentState === null) {
      this.log.error('PiLazorTag: No state for: ' + stateToSet + ' found !');
      return;
    }

    this.log.info('PiLazorTag: changed to state: ' + this.currentState);
    this.emitCurrentState();
  }



  /**
   * Emits the event with the current state
   */
  emitCurrentState() {
    this.eventHandler.mainEvents.STATE_CHANGED.emit(this.currentState);
  }

}

module.exports = new PiLazorTag();