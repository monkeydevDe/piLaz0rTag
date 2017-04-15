class BaseDisplay {

  constructor() {
    this.log = require('../../lib/Logger');
    this.eventHandler = require('../../lib/LaserTagEventHandler');

    const instance = this;

    // register on the display game update event
    this.eventHandler.onDisplayGameUpdate(function(game) {
      instance.handleUpdateGameStatus(game);
    })
  }

  handleUpdateGameStatus(game) {
    this.log.error('Display: Implement me.');
  }
}

exports.BaseDisplay = BaseDisplay;