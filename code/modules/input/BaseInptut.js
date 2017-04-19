class BaseInput {
  constructor() {
    this.eventHandler = require('../../lib/LaserTagEventHandler');
    this.log = require('../../lib/Logger');
  }

  /**
   * Is called when the input wants to trigger a shoot event.
   */
  triggerShoot() {
    this.eventHandler.buttonEvents.SHOOT_BTN.emit();
  }

  
  /**
   * When to reload
   */
  triggerReload() {
    this.eventHandler.buttonEvents.RELOAD_BTN.emit();
  }
}

exports.BaseInput = BaseInput;