
const { BaseClass } = require('../../lib/BaseClass');

class BaseDisplay extends BaseClass {

  constructor() {
    super();
    let instance = this;

    // register on the display game update event
    this.eventHandler.mainEvents.STATE_DATA_UPDATED.on(function(gameStatus) {
      instance.handleUpdateStateData(gameStatus);
    });

    this.eventHandler.mainEvents.STATE_CHANGED.on(function(state) {
       instance.handleMainStateChanged(state);
    });

    this.eventHandler.gameEvents.GAME_OVER.on(function() {
      instance.handleGameOver();
    });
  }

  /**
   * When in a game this is called when some data like from the player changed.
   * @param stateStatus the stateStatus
   */
  handleUpdateStateData(stateStatus) {
    this.log.error('Display: Implement me: '+this.handleUpdateStateData.name);
  }

  /**
   * Handles when the game finished
   */
  handleGameOver() {
    this.log.error('Display: Implement me: '+this.handleGameOver.name);
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