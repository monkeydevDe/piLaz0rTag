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

    this.socketHost = 'http://localhost:'+this.settings.WEBSERVER_PORT;

    this.socketIo = require('socket.io-client')(this.socketHost);

    const instance = this;
    this.socketIo.on('connect', function(){
      instance.log.info('SSD1306Server: Connected to '+instance.socketHost);
    });

    this.socketIo.on('ssd1306display', function(data){
      if(data.type === 'mainstate') {
        instance._handleMainStateChanged(data.data);
      }

      if(data.type === 'gamestatus') {
        instance._handleUpdateGameStatus(data.data);
      }

    });

    this.oledDisplay = new Oled(this.settings.SSD1306_CFG);
    this.oledDisplay.update();
    this.oledDisplay.dimDisplay(true);
  }

  _handleMainStateChanged(state) {
    this.oledDisplay.clearDisplay();
    this.oledDisplay.setCursor(0, 0);
    this.oledDisplay.writeString(this.font, 1, state, 1, true);
  }

  _handleUpdateGameStatus(player) {
    this.oledDisplay.clearDisplay();
    this.oledDisplay.setCursor(0, 0);
    this.oledDisplay.writeString(this.font, 1, 'Mags: '+player.status.mags + '/'+player.mags, 1, false);
    this.oledDisplay.setCursor(0, 20);
    this.oledDisplay.writeString(this.font, 1, 'Rounds: '+player.status.roundsInMag+ '/'+player.roundsPerMag, 1, false);
  }

  
}

new SSD1306Server();