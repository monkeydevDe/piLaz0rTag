/**
 * The actual main class of the PiLazorTag
 */
const { BaseClass } = require('./BaseClass');
const { Player } = require('./game/Player');


class PiLazorTag extends BaseClass {

  constructor() {

    super();

    this.log.info('PiLazorTag: Starting main game handler.');

    if(this.settings.DEBUG_LEVEL) {
      this.log.info('===============================================');
      //Loop over all Settings
      for(let vars in this.settings.modules)
        this.log.info(vars + ': ' + this.settings.modules[vars]);
      this.log.info('===============================================');
    }

    this.moduleRegistry = require('./ModulesRegistry');
    this.webserver = require('../modules/web/Webserver');
    this.websocketMsgHandler = require('./WebSocketGameMsgHandler');
    this.mainStates = require('./MainStates');


    // the current status of the main game
    this.currentState = this.mainStates.SETUP;

    this.gameFactory = require('./game/GameFactory');

    // when a game is running this holds the instance.
    this.currentGame = null;

    let instance = this;

    this.emitCurrentState();

    this.eventHandler.mainEvents.GET_STATE.on(function() {
      instance.emitCurrentState();
    });


    this.eventHandler.mainEvents.GAME_SETUP.on(function(gameSetupData){
      instance.setupGame(gameSetupData);
    });

    this.eventHandler.mainEvents.GAME_STOP.on(function() {
       instance.stopGame();
    });

    this.eventHandler.mainEvents.GAME_STARTED.on(function() {
      instance.log.info('PiLaz0rTag: Game is running.');
      instance.currentState = instance.mainStates.GAME_RUNNING;
      instance.emitCurrentState();
      instance.currentGame.propergateGameStatus();
    });
  }

  /**
   * This will stop the current game and will go to SETUP
   */
  stopGame() {
    this.currentGame.cleanUpEvents();
    this.currentGame = null;
    delete this.currentGame;
    this.currentState = this.mainStates.SETUP;
    this.emitCurrentState();
  }

  /**
   * Setups the current game
   * @param gameData
   */
  setupGame(gameData) {

    this.log.info('PiLaz0rTag: Starting new game: '+gameData);
    
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

    this.log.info('PiLaz0rTag: game is ready and will start in: '+gameData.gameStartTime);

    let instance = this;
    setTimeout(function() {
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