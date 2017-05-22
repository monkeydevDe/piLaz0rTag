const { BaseState } = require('./BaseState');
const {GameInternalState} = require('../game/GameInternalState');

/**
 * This is the state which waits until the game has to start
 */
class GameRunningState extends BaseState {

  constructor(gameData) {
    super();

    this.gameFactory = require('../game/GameFactory');


    const gameState = new GameInternalState(
      gameData.client.playerId,
      gameData.client.team,
      gameData.client.lives,
      gameData.client.health,
      gameData.client.respawnTime,
      gameData.client.shootStrength,
      gameData.client.mags,
      gameData.client.roundsPerMag,
      gameData.client.reloadTime,
      gameData.client.shootDelay);

    this.currentGame = this.gameFactory.initGame(gameData.currentGameMode, gameState);

    this.log.info('GameRunningState: game is running: '+gameData.currentGameMode);

  }

  internalCleanup() {
    this.currentGame.cleanUpEvents();
    this.currentGame = null;
    delete this.currentGame;
  }

}

exports.GameRunningState  = GameRunningState;