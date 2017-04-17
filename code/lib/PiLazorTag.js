class PiLazorTag {

  constructor() {

    this.log = require('./Logger');
    this.settings = require('../modules/settings');

    this.log.info('PiLazorTag: Starting main game handler.');
    if(this.settings.DEBUG_LEVEL) {
      this.log.info('===============================================');
      //Loop over all Settings
      for(let vars in this.settings)
        this.log.info(vars + ': ' + this.settings[vars]);
      this.log.info('===============================================');
    }


    this.eventHandler = require('./LaserTagEventHandler');
    this.input = require('../modules/input/InputFactory');
    this.infrared = require('../modules/infrared/InfraredFactory');
    this.webserver = require('../modules/web/Webserver');
    this.display = require('../modules/display/DisplayFactory');

    // the current status of the main game
    this.currentState = 'SETUP';

    this.gameFactory = require('./game/GameFactory');

    // when a game is running this holds the instance.
    this.currentGame = null;

    const instance = this;

    this.emitCurrentState();

    this.eventHandler.onGetMainState(function() {
      instance.emitCurrentState();
    });

    this.eventHandler.onWebsocketMsg(function(msg) {
      if(msg.type === 'start_game') {
        instance.eventHandler.emitSetupGame(msg.value);
      }

      if(msg.type === 'stop_game') {
        instance.eventHandler.emitStopGame();
      }
    });

    this.eventHandler.onSetupGame(function(gameSetupData){
      instance.setupGame(gameSetupData);
    });

    this.eventHandler.onStopGame(function() {
       instance.stopGame();
    });

    this.eventHandler.onStartGame(function() {
      instance.log.info('PiLaz0rTag: Game is running.');
      instance.currentState = 'GAME_RUNNING';
      instance.emitCurrentState();
      instance.eventHandler.emitDisplayGameUpdate(instance.currentGame);
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
      instance.eventHandler.emitStartGame();
    }, gameData.gameStartTime);
  }

  /**
   * Emits the event with the current state
   */
  emitCurrentState() {
    this.eventHandler.emitCurrentMainStateChange(this.currentState);
  }

}

module.exports = new PiLazorTag();