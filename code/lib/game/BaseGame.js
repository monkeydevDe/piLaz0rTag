/**
 * The actual game handling everything
 */
class BaseGame {

  constructor(player, opts) {
    this.log = require('../Logger');
    this.eventHandler = require('../LaserTagEventHandler');
    this.opts = opts;
    this.player = player;

    const instance = this;

    // register shoot handling when the user hits the button :)
    this.eventHandler.onGameButtonShoot(function() {
      instance.shoot();
    });

    this.eventHandler.onGameButtonReload(function() {
       instance.reload();
    });

    this.eventHandler.onGameReloadDone(function() {
       instance.reloadDone();
    });

    this.eventHandler.onGameStatus(function() {
       instance.propergateGameStatus();
    });

    this.eventHandler.onGamePlayerHit(function(hitData) {
       instance.handlePlayerHit(hitData);
    });
  }

  handlePlayerHit(hitData) {
    if(this.player.team == hitData.team && this.player.id == hitData.id) {
      this.log.info('Game: You hit your self.');
      return;
    }

    this._handlePlayerHit(hitData);
  }

  _handlePlayerHit(hitData) {
    this.log.error('Game: Implement me handlePlayerHit !');
  }

  /**
   * This will emit all events which handle the game status.
   */
  propergateGameStatus() {
    this.eventHandler.emitDisplayGameUpdate(this);
  }

  /**
   * This is called when the game decided that the player is damaged.
   * @param strength
   */
  onHit(strength) {
    this.log.info('Game: got hit with: '+strength);

    if(this.player.status.health <= 0) {
      this.log.info('Game: Player is already dead.');
      return;
    }

    this.player.status.health-=strength;
    if(this.player.status.health < 0) {
      this.player.status.health = 0;
    }

    if(this.player.status.health <= 0) {
      // emit death
    }

    this.propergateGameStatus();
  }

  /**
   * Handles shooting
   */
  shoot() {
    this.log.info('Game: Shoot');

    if(this.player.status.reloading == true) {
      this.log.debug('Game: Player is reloading no shooting possible');
      return;
    }

    if(this.player.status.shot == true) {
      this.log.debug('Game: Player is shooting no shooting possible');
      return;
    }

    if(this.player.status.mags === 0 && player.status.roundsInMag === 0) {
      this.log.debug('Game: no bullets and mags left');
      return;
    }

    if(this.player.status.roundsInMag === 0) {
      this.log.debug('Game: no bullets left in current mag');
      // TODO: emit game_info_emptymag
      return;
    }

    this.player.status.roundsInMag--;


    this.eventHandler.emitShoot(this.player);
    this.propergateGameStatus();
  }

  /**
   * Handles reloading
   */
  reload() {
    this.log.info('Game: Reload');

    if(this.player.status.reloading == true) {
      this.log.debug('Game: Player is already reloading.');
      return;
    }

    if(this.player.status.mags === 0) {
      this.log.debug('Game: No Mags left');
      return;
    }

    // mark the player reloading
    this.player.status.reloading = true;

    this.log.debug('Game: starting reloading for: '+this.player.reloadTime);

    this.propergateGameStatus();

    const instance = this;
    setTimeout(function() {
      instance.eventHandler.emitReloadDone();
    },this.player.reloadTime);
    
  }


  /**
   * This is called when the reloading process is done
   */
  reloadDone() {
    this.log.info('Game: Reload done');
    this.player.status.reloading = false;
    this.player.status.roundsInMag = this.player.roundsPerMag;
    this.player.status.mags--;
    this.propergateGameStatus();
  }

}

exports.BaseGame = BaseGame;