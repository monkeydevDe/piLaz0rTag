/**
 * Watches for all relevant led events and does the light show.
 */

const {BaseClass} = require('../../lib/BaseClass');

class BaseLedHandler extends BaseClass {

  constructor() {
    super();

    const instance = this;

    this.eventHandler.gameEvents.SHOOT.on(function(player) {
      instance.flashMuzzleLed();
    });

  }

  /**
   * Led the muzzle leds flash
   */
  flashMuzzleLed() {
    this._internalMuzzleLed(true);
    const instance = this;
    setTimeout(function() {
      instance._internalMuzzleLed(false)
    }, 300);
  }

  /**
   * This has to be implemeted in the actual led implementation
   * @param on if to turn on or off the led
   */
  _internalMuzzleLed(on) {
    this.log.error('Led: Implement me: ' + this.internalMuzzleLed.name);
  }
}


exports.BaseLedHandler = BaseLedHandler;