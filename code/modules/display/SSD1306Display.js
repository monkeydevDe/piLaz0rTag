const {BaseDisplay} = require('./BaseDisplay');

class SSD1306Display extends BaseDisplay {
  constructor() {
    super();

    this.webserver = require('../web/Webserver');

    this._initServerProcess();
  }

  _initServerProcess() {
    let exec = require('child_process').exec;
    this.serverProcess = exec('node '+__dirname+'/SSD1306Server/SSD1306Server.js');
    let instance = this;
    this.serverProcess.stderr.on('data', function(data) {
      instance.log.error('SSD1306 Server error: '+data);
    });
  }

  handleMainStateChanged(state) {
    this._sendDataOverWebsocket('mainstate',state);
  }

  handleUpdateGameStatus(gameStatus) {
    this._sendDataOverWebsocket('gamestatus',gameStatus);
  }

  _sendDataOverWebsocket(type,data) {
    this.webserver.sendDataOverSocket('ssd1306display',{type: type, data: data});
  }
}

module.exports = new SSD1306Display();

