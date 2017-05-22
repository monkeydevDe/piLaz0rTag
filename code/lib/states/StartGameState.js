const { BaseState } = require('./BaseState');

/**
 * This is the state which waits until the game has to start
 */
class StartGameState extends BaseState {

  constructor(gameData) {
    super();

    this.log.info('StartGameState: Starting new game: ' + gameData);

    this.log.info('StartGameState: game is ready and will start in: ' + gameData.gameStartTime);

    setTimeout(function () {
      instance.eventHandler.mainEvents.GAME_STARTED.emit();
    }, gameData.gameStartTime);
  }

}

exports.StartGameState = StartGameState;