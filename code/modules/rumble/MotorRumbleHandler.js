const { BaseRumbleHandler } = require('./BaseRumbleHandler');

class MotorRumbleHandler extends BaseRumbleHandler {

  constructor() {
    super();
    this.settings = require('../settings');
    const Gpio = require('onoff').Gpio;
    this.log.info('MotorRumbleHandler: Using motorpin: '+this.settings.RUMBLE_MOTOR_CFG.PIN);
    this.motor1Pin =new Gpio(this.settings.RUMBLE_MOTOR_CFG.PIN, 'out');
  }

  _turnOn() {
    this.motor1Pin.writeSync(1);
  }

  _turnOff() {
    this.motor1Pin.writeSync(0);
  }

  _cleanUpInternal() {
    this.log.debug('MotorRumbleHandler: unexporting pin: '+this.settings.RUMBLE_MOTOR_CFG.PIN);
    this.motor1Pin.unexport();
  }

}

module.exports.MotorRumbleHandler = new MotorRumbleHandler();