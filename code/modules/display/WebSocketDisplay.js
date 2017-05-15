
const {BaseDisplay} = require('./BaseDisplay');

class WebSocketDisplay extends BaseDisplay {

  constructor() {
    super();
    this.webserver = require('../web/Webserver');
  }

  handleUpdateGameStatus(game) {
    this.log.debug('Webdisplay: Updating game status display.');
    this.webserver.sendDisplayDataOverSocket('game_status',game.player);
  }

  handleMainStateChanged(state) {
    this.log.debug('Webdisplay: Main game state changed to: '+state);
    this.webserver.sendDisplayDataOverSocket('state_changed',state);
  }

  handleGameOver() {
    this.webserver.sendDisplayDataOverSocket('game_over',{});
  }
}

module.exports = new WebSocketDisplay();