const { BaseClass } = require('../../lib/BaseClass');

class BaseInputHandler extends BaseClass {
  constructor() {
    super();
  }

  /**
   * Is called when the input wants to trigger a shoot event.
   */
  triggerShot(state) {
    if(state === 'down') {
      this.eventHandler.buttonEvents.SHOOT_BTN.emit();
    }
  }
  
  /**
   * When to reload
   */
  triggerReload(state) {
    if(state === 'down') {
      this.eventHandler.buttonEvents.RELOAD_BTN.emit();
    }
  }


  /**
   * When to change the mode of the weapon
   */
  triggerModeSwitch(state) {
    if(state === 'down') {
      this.eventHandler.buttonEvents.MODE_BTN.emit();
    }
  }

}

exports.BaseInputHandler = BaseInputHandler;