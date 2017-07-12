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
   // noop web display takes care of this and is already running
  }

  handleUpdateStateData(stateStatus) {
    // noop web display takes care of this and is already running
  }
}

module.exports = new SSD1306Display();

