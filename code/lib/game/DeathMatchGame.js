const {BaseGame} = require('./BaseGame');

class DeathMatchGame extends BaseGame {

  constructor(player,opts) {
    super(player,opts);
    this.log.info('Game: Starting DeathMatchGame');
  }


  _handlePlayerHit(hitData) {
    this.onHit(hitData.strength);
  }
}

exports.DeathMatchGame = DeathMatchGame;