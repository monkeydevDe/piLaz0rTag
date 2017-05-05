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
    
    this.lastPlayerState = null;


    let instance = this;
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
    //this.oledDisplay.dimDisplay(true);
  }

  _handleMainStateChanged(state) {
    this.oledDisplay.clearDisplay();
    this.oledDisplay.setCursor(0, 0);
    this.oledDisplay.writeString(this.font, 1, state, 1, true);
  }

  _handleUpdateGameStatus(player) {
                                
    if(this.lastPlayerState === null) {
      let instance = this;
      setTimeout(function() {
        instance.oledDisplay.clearDisplay();
        instance.oledDisplay.setCursor(0, 0);
        instance.oledDisplay.writeString(instance.font, 1, 'Mags: '+instance.lastPlayerState.status.mags + '/'+instance.lastPlayerState.mags, 1, false);
        instance.oledDisplay.setCursor(0, 15);
        instance.oledDisplay.writeString(instance.font, 1, 'Rounds: '+instance.lastPlayerState.status.roundsInMag+ '/'+instance.lastPlayerState.roundsPerMag, 1, false);
        instance.lastPlayerState = null;    
      },300);
    }

    this.lastPlayerState = player;
    
    
    
  }

  
}

new SSD1306Server();