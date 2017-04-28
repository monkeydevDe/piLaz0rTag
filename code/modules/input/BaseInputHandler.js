const { BaseClass } = require('../../lib/BaseClass');

class BaseInputHandler extends BaseClass {
  constructor() {
    super();
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

exports.BaseInputHandler = BaseInputHandler;