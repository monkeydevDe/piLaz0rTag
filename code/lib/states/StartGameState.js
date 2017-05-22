const { BaseState } = require('./BaseState');

/**
 * This is the state which waits until the game has to start
 */
class StartGameState extends BaseState {

  constructor(gameData) {
    super();

    this.log.info('StartGameState: game is ready and will start in: ' + gameData.gameStartTime);

    const instance = this;

    setTimeout(function () {
      instance.log.error('StartGameState: STAAART');
    }, gameData.gameStartTime);
  }

}

exports.StartGameState = StartGameState;