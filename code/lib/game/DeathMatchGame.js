const {BaseGame} = require('./BaseGame');

class DeathMatchGame extends BaseGame {

  constructor(player,opts) {
    super(player,opts);
    this.log.info('Game: Starting DeathMatchGame');
  }
}

exports.DeathMatchGame = DeathMatchGame;