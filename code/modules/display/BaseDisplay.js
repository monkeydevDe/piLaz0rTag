class BaseDisplay {

  constructor() {
    this.log = require('../../lib/Logger');
    this.eventHandler = require('../../lib/LaserTagEventHandler');

    const instance = this;

    // register on the display game update event
    this.eventHandler.onDisplayGameUpdate(function(game) {
      instance.handleUpdateGameStatus(game);
    });

    this.eventHandler.onCurrentMainStateChange(function(state) {
       instance.handleMainStateChanged(state);
    });
  }

  /**
   * When in a game this is called when some data like from the player changed.
   * @param game the current game running
   */
  handleUpdateGameStatus(game) {
    this.log.error('Display: Implement me handleUpdateGameStatus.');
  }

  /**
   * This is called when the main state changed of the game
   * @param state for example SETUP/GAME etc
   */
  handleMainStateChanged(state) {
    this.log.error('Display: Implement me handleMainStateChanged.');
  }
}

exports.BaseDisplay = BaseDisplay;