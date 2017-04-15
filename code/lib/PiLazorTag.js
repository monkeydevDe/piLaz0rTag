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

    // when a game is running this holds the instance.
    this.currentGame = null;

    const instance = this;

    this.emitCurrentState();

    this.eventHandler.onGetMainState(function() {
      instance.emitCurrentState();
    });
  }

  /**
   * Emits the event with the current state
   */
  emitCurrentState() {
    this.eventHandler.emitCurrentMainStateChange(this.currentState);
  }

  getMainStatus() {
    return this.currentState;
  }

}

module.exports = new PiLazorTag();