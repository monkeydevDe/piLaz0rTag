/**
 * The actual game handling everything
 */
class BaseGame {

  constructor(player,opts) {
    this.log = require('../Logger');
    this.eventHandler = require('../LaserTagEventHandler');
    this.opts = opts;
    this.player = player;
  }



  shoot() {
    this.log.info('Game: Shoot');

    if(player.status.reloading == true) {
      this.log.debug('Game: Player is reloading no shooting possible');
      return;
    }

    if(player.status.shot == true) {
      this.log.debug('Game: Player is shooting no shooting possible');
      return;
    }

    if(player.status.mags === 0 && player.status.roundsInMag === 0) {
      this.log.debug('Game: no bullets and mags left');
      return;
    }

    if(player.status.roundsInMag === 0) {
      this.log.debug('Game: no bullets left in current mag');
      // TODO: emit game_info_emptymag
      return;
    }

    player.status.roundsInMag--;


    this.eventHandler.emitShoot(player);
  }

}

exports.BaseGame = BaseGame;