class BaseInput {
  constructor() {
    this.eventHandler = require('../../lib/LaserTagEventHandler');
    this.log = require('../../lib/Logger');
  }

  /**
   * Is called when the input wants to trigger a shoot event.
   */
  triggerShoot() {
    this.eventHandler.emitShoot();
  }

  
  /**
   * When to reload
   */
  triggerReload() {
    this.eventHandler.emitReload();
  }
}

exports.BaseInput = BaseInput;