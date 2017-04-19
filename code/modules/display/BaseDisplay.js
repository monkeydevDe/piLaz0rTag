class BaseDisplay {

  constructor() {
    this.log = require('../../lib/Logger');
    this.eventHandler = require('../../lib/LaserTagEventHandler');

    const instance = this;

    // register on the display game update event
    this.eventHandler.gameEvents.GAME_DATA_UPDATE.on(function(game) {
      instance.handleUpdateGameStatus(game);
    });

    this.eventHandler.mainEvents.STATE_CHANGED.on(function(state) {
       instance.handleMainStateChanged(state);
    });
  }

  /**
   * When in a game this is called when some data like from the player changed.
   * @param game the current game running
   */
  handleUpdateGameStatus(game) {
    this.log.error('Display: Implement me: '+this.handleUpdateGameStatus.name);
  }

  /**
   * This is called when the main state changed of the game
   * @param state for example SETUP/GAME etc
   */
  handleMainStateChanged(state) {
    this.log.error('Display: Implement me: '+this.handleMainStateChanged.name);
  }
}

exports.BaseDisplay = BaseDisplay;