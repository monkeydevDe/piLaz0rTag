const { BaseRumbleHandler } = require('./BaseRumbleHandler');

class MotorRumbleHandler extends BaseRumbleHandler {

  constructor() {
    super();

    const settings = require('../settings');
    this.gpio = require("pi-gpio");

    const instance = this;

    this.gpio.open(settings.RUMBLE_MOTOR_CFG.PIN, "output", function(err) {
      if(err) {
        this.log.error('MotorRumble: An error happened while opening pin: '+settings.RUMBLE_MOTOR_CFG.PIN+' '+err);
      }
    });
  }

  _turnOn() {

  }

  _turnOff() {

  }

}

module.exports.MotorRumbleHandler = new MotorRumbleHandler();