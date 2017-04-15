
const {BaseDisplay} = require('./BaseDisplay');

class WebSocketDisplay extends BaseDisplay {

  constructor() {
    super();
    this.webserver = require('../web/Webserver');
  }

  handleUpdateGameStatus(game) {
    this.log.debug('Webdisplay: Updating display.');
    this.webserver.sendDisplayDataOverSocket(game.player);
  }
}

module.exports = new WebSocketDisplay();