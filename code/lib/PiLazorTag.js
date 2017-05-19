/**
 * The actual main class of the PiLazorTag
 */
const {BaseClass} = require('./BaseClass');

// TODO Perhaps put this in a factory like for games
const {MasterState} = require('./states/MasterState');
const {ClientMode} = require('./states/ClientState');

const {Player} = require('./game/Player');


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

    this.gameFactory = require('./game/GameFactory');

    // when a game is running this holds the instance.
    this.currentGame = null;

    // when a mode client/master/setup is set it is holded here
    this.currentMode = null;

    const instance = this;


    this.eventHandler.mainEvents.GET_STATE.on(function () {
      instance.emitCurrentState();
    });

    this.eventHandler.mainEvents.GAME_SETUP.on(function (gameSetupData) {
      instance.setupGame(gameSetupData);
    });

    this.eventHandler.mainEvents.GAME_STOP.on(function () {
      instance.stopGame();
    });

    this.eventHandler.mainEvents.CHANGE_STATE.on(function (stateToSet) {
      instance._changeState(stateToSet);
    });

    this.eventHandler.mainEvents.GAME_STARTED.on(function () {
      instance.log.info('PiLaz0rTag: Game is running.');
      instance.currentState = instance.mainStates.GAME_RUNNING;
      instance.emitCurrentState();
      instance.currentGame.propergateGameStatus();
    });
  }

  /**
   * Will change the state
   */
  _changeState(stateData) {

    const stateToSet = stateData.state;

    this.currentState = null;
    this.currentMode = null;
    delete this.currentMode;

    if (stateToSet === 'MASTER_MODE') {
      this.currentMode = new MasterState();
      this.currentState = this.mainStates.MASTER_MODE;
    }

    if (stateToSet === 'CLIENT_MODE') {
      this.currentMode = new ClientMode(stateData.data.host);
      this.currentState = this.mainStates.CLIENT_MODE;
    }

    if (stateToSet === 'SELECT_MODE') {
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
   * This will stop the current game and will go to SETUP
   */
  stopGame() {
    this.currentGame.cleanUpEvents();
    this.currentGame = null;
    delete this.currentGame;
    this.currentState = this.mainStates.SELECT_MODE;
    this.emitCurrentState();
  }

  /**
   * Setups the current game
   * @param gameData
   */
  setupGame(gameData) {

    this.log.info('PiLaz0rTag: Starting new game: ' + gameData);

    const player = new Player(
      gameData.player.id,
      gameData.player.team,
      gameData.player.lives,
      gameData.player.health,
      gameData.player.respawnTime,
      gameData.player.shootStrength,
      gameData.player.mags,
      gameData.player.roundsPerMag,
      gameData.player.reloadTime,
      gameData.player.shootDelay);

    this.currentGame = this.gameFactory.initGame(gameData.mode, player);
    this.currentState = this.mainStates.GAME_STARTING;

    this.emitCurrentState();

    this.log.info('PiLaz0rTag: game is ready and will start in: ' + gameData.gameStartTime);

    let instance = this;
    setTimeout(function () {
      instance.eventHandler.mainEvents.GAME_STARTED.emit();
    }, gameData.gameStartTime);
  }

  /**
   * Emits the event with the current state
   */
  emitCurrentState() {
    this.eventHandler.mainEvents.STATE_CHANGED.emit(this.currentState);
  }

}

module.exports = new PiLazorTag();