const { BaseRumbleHandler } = require('./BaseRumbleHandler');

class WebSocketRumbleHandler extends BaseRumbleHandler {

  constructor() {
    super();
    this.webserver = require('../web/Webserver');
  }

  _turnOn() {
    this.webserver.sendDataOverSocket('rumble',{on: true});
  }

  _turnOff() {
    this.webserver.sendDataOverSocket('rumble',{on: false});
  }

}

module.exports = new WebSocketRumbleHandler();