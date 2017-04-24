const {BaseGame} = require('./BaseGame');

class TeamDeathMatchGame extends BaseGame {

  constructor(player,opts) {
    super(player,opts);
    this.log.info('Game: Starting TeamDeathMatchGame');

    // we set the color of the leds to the right team and indicate them as status on.
    this.player.status.led.color = this.player.team;
    this.player.status.led.on = true;
    this.eventHandler.ledEvents.SET.emit(this);
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