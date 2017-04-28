/**
 * Does some rumble when the user does certain stuff
 */

const {BaseClass} = require('../../lib/BaseClass');

class BaseRumbleHandler extends BaseClass {

  constructor() {
    super();


    const instance = this;
    // when shooting flash the muzzle
    this.eventHandler.gameEvents.SHOOT.on(function() {
      instance.rumbleShoot();
    });
  }

  /**
   * Is called when to rumble for a shot :)
   */
  rumbleShoot() {

    this._turnOn();

    const instance = this;

    setTimeout(function() {
      instance._turnOff();
    }, 150);

  }

  /**
   * Is called when to turn off the rumble
   */
  _turnOff() {
    this.log.error('Rumble: Implement me: ' + this._turnOff().name);
  }

  /**
   * Is called when to turn on the rumble
   */
  _turnOn() {
    this.log.error('Rumble: Implement me: ' + this._turnOn().name);
  }


}

exports.BaseRumbleHandler = BaseRumbleHandler;