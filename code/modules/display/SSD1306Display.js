const {BaseDisplay} = require('./BaseDisplay');

class SSD1306Display extends BaseDisplay {
  constructor() {
    super();
    const Oled = require('oled-ssd1306-i2c');

    this.font = require('oled-font-5x7');

    this.webserver = require('../web/Webserver');

    
    this.oledDisplay = new Oled(this.settings.SSD1306_CFG);
    this.oledDisplay.update();
    this.oledDisplay.dimDisplay(true);
  }

  handleMainStateChanged(state) {
    this._sendDataOverWebsocket('mainstate',state);
  }

  handleUpdateGameStatus(game) {
    this._sendDataOverWebsocket('gamestatus',game.player);
  }

  _sendDataOverWebsocket(type,data) {
    this.webserver.sendDataOverSocket('ssd1306display',{type: type, data: data});
  }
}

module.exports = new SSD1306Display();

