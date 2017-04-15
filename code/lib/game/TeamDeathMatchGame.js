const {BaseGame} = require('./BaseGame');

class TeamDeathMatchGame extends BaseGame {

  constructor(player,opts) {
    super(player,opts);
    this.log.info('Game: Starting TeamDeathMatchGame');
  }


  _handlePlayerHit(hitData) {
    if(this.player.team != hitData.team) {
      this.log.info('TeamDeathMatch: Got hit by team: '+hitData.team);
      this.onHit(hitData.strength);
      return;
    }

    this.log.info('TeamDeathMatch: Got hit by another team member do nothing');
  }
}

exports.TeamDeathMatchGame = TeamDeathMatchGame;