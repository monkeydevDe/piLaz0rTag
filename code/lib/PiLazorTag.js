/**
 * The actual main class of the PiLazorTag
 */
const {BaseClass} = require('./BaseClass');

class PiLazorTag extends BaseClass {

  constructor() {

    super();

    this.log.info('PiLazorTag: Starting main game handler.');
    if(this.settings.DEBUG_LEVEL) {
      this.log.info('===============================================');
      //Loop over all Settings
      for(let vars in this.settings)
        this.log.info(vars + ': ' + this.settings[vars]);
      this.log.info('===============================================');
    }

    this.moduleRegistry = require('./ModulesRegistry');

    this.webserver = require('../modules/web/Webserver');

    

    // the current status of the main game
    this.currentState = 'SETUP';

    this.gameFactory = require('./game/GameFactory');

    // when a game is running this holds the instance.
    this.currentGame = null;

    const instance = this;

    this.emitCurrentState();

    this.eventHandler.mainEvents.GET_STATE.on(function() {
      instance.emitCurrentState();
    });

    //TODO: move this away from here for example implement a gameMsgHandler could be needed for bluetooth
    this.eventHandler.webSocketEvents.SOCKET_MESSAGE_RECEIVED.on(function(msg) {
      if(msg.type === 'start_game') {
        instance.eventHandler.mainEvents.GAME_SETUP.emit(msg.value);
      }

      if(msg.type === 'stop_game') {
        instance.eventHandler.mainEvents.GAME_STOP.emit();
      }
    });

    this.eventHandler.mainEvents.GAME_SETUP.on(function(gameSetupData){
      instance.setupGame(gameSetupData);
    });

    this.eventHandler.mainEvents.GAME_STOP.on(function() {
       instance.stopGame();
    });

    this.eventHandler.mainEvents.GAME_STARTED.on(function() {
      instance.log.info('PiLaz0rTag: Game is running.');
      instance.currentState = 'GAME_RUNNING';
      instance.emitCurrentState();
      instance.currentGame.propergateGameStatus();
    });
  }

  /**
   * This will stop the current game and will go to SETUP
   */
  stopGame() {
    this.currentGame = null;
    this.currentState = 'SETUP';
    this.emitCurrentState();
  }

  /**
   * Setups the current game
   * @param gameData
   */
  setupGame(gameData) {

    this.log.info('PiLaz0rTag: Starting new game: '+gameData);
    
    const {Player} = require('./game/Player');
    
    let player = new Player(
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
    this.currentState = 'GAME_STARTING';

    this.emitCurrentState();

    this.log.info('PiLaz0rTag: game is ready and will start in: '+gameData.gameStartTime);

    const instance = this;
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