const { BaseState } = require('./BaseState');
const {GameInternalState} = require('../game/GameInternalState');

/**
 * This is the state which waits until the game has to start
 */
class GameRunningState extends BaseState {

  constructor(gameData) {
    super();

    this.log.info('GameRunningState: game is running: '+gameData.currentGameMode);

    this.gameFactory = require('../game/GameFactory');


    const gameState = new GameInternalState(
      gameData.client.playerId,
      gameData.client.team,
      gameData.client.lives,
      gameData.client.health,
      gameData.client.respawnTime,
      gameData.client.shotStrength,
      gameData.client.mags,
      gameData.client.roundsPerMag,
      gameData.client.reloadTime,
      gameData.client.shootDelay);

    this.currentGame = this.gameFactory.initGame(gameData.currentGameMode, gameState);

    const instance = this;
    // when a local client wants the current state
    this.addEvent(this.eventHandler.mainEvents.GET_STATE_DATA.on(function() {
      instance.currentGame.propergateGameStatus();
    },true));

  }

  internalCleanup() {
    this.currentGame.cleanUpEvents();
    this.currentGame = null;
    delete this.currentGame;
  }

}

exports.GameRunningState  = GameRunningState;