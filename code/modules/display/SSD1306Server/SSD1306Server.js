/**
 * Handles the SSD1306 oled display handling.
 * https://www.npmjs.com/package/socket.io-client
 */
class SSD1306Server {

  constructor() {
    this.log = require('../../../lib/Logger');
    this.settings = require('../../../lib/Settings');

    const Oled = require('oled-ssd1306-i2c');

    this.font = require('oled-font-5x7');

    this.socketHost = 'http://localhost:' + this.settings.WEBSERVER_PORT;

    this.socketIo = require('socket.io-client')(this.socketHost);

    this.stateData = null;

    this.currentState = null;


    const instance = this;
    this.socketIo.on('connect', function() {
      instance.log.info('SSD1306Server: Connected to ' + instance.socketHost);
    });

    this.socketIo.on('display', function(data) {
      if(data.type === 'state_changed') {
        instance._handleMainStateChanged(data.data);
      }

      if(data.type === 'state_status') {
        instance._handleUpdateStateData(data.data);
      }

    });

    this.oledDisplay = new Oled(this.settings.SSD1306_CFG);
    this.oledDisplay.update();
    //this.oledDisplay.dimDisplay(true);
  }

  _handleMainStateChanged(state) {   
    this.currentState = state;
  }

  _handleUpdateStateData(stateData) {
    if(this.stateData === null) {
      let instance = this;
      setTimeout(function() {
        instance.oledDisplay.clearDisplay();
        if(instance.currentState === 'GAME_RUNNING') {
          instance.oledDisplay.setCursor(0, 0);
          instance.oledDisplay.writeString(instance.font, 1, 'Mags: ' + instance.stateData.status.mags + '/' + instance.stateData.mags, 1, false);
          instance.oledDisplay.setCursor(0, 15);
          instance.oledDisplay.writeString(instance.font, 1, 'Rounds: ' + instance.stateData.status.roundsInMag + '/' + instance.stateData.roundsPerMag, 1, false);
        } else {
          instance.oledDisplay.setCursor(0, 0);
          instance.oledDisplay.writeString(instance.font, 1, instance.currentState, 1, true);
        }

        instance.stateData = null;
      }, 150);
    }

    this.stateData = stateData;


  }


}

new SSD1306Server();