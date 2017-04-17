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

    this.eventHandler.onRespawningDone(function() {
       instance.handleRespawnDone();
    });
  }

  /**
   * This is called when we received an player hit message.
   * @param hitData
   */
  handlePlayerHit(hitData) {
    if(this.player.team == hitData.team && this.player.id == hitData.id) {
      this.log.info('Game: You hit your self.');
      return;
    }

    this._handlePlayerHit(hitData);
  }

  /**
   * This is called when the player is respawend.
   */
  handleRespawnDone() {

    this.log.info('Game: Player respawning done.');

    // reset game status
    this.player.status.health = this.player.health;
    this.player.status.roundsInMag = this.player.roundsPerMag;
    this.player.status.mags = this.player.mags;
    this.player.status.respawning = false;

    this.propergateGameStatus();
  }

  /**
   * Internal hit handler which has to be implemented in the game itself.
   * @param hitData
   * @private
   */
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

    let playerActionStatus = this.player.checkPlayerStatus();
    if(playerActionStatus == false) {
      this.log.info('Game: Player is not in the status to get a hit.');
      return;
    }

    this.player.status.health-=strength;
    if(this.player.status.health < 0) {
      this.player.status.health = 0;
    }

    this.log.info('Game: Player health is: '+this.player.status.health);

    if(this.player.status.health <= 0) {
      // player has still some lives left let him respawn
      if(this.player.status.lives > 0) {

        // remove a live from the player
        this.player.status.lives--;
        this.log.info('Game: Player lives: '+this.player.status.lives);

        this.player.status.respawning = true;
        const instance = this;

        this.log.info('Game: Respawn player in: '+this.player.respawnTime);

        setTimeout(function() {
          instance.eventHandler.emitRespawningDone();
        },this.player.respawnTime);
      }
    }
    

    this.propergateGameStatus();
  }

  /**
   * Handles shooting
   */
  shoot() {
    this.log.info('Game: Shoot');

    let playerActionStatus = this.player.checkPlayerStatusWithReload();
    if(playerActionStatus == false) {
      this.log.info('Game: Player is not in the status to perform shooting.');
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

    let playerActionStatus = this.player.checkPlayerStatusWithReload();
    if(playerActionStatus == false) {
      this.log.info('Game: Player is not in the status to perform reloading.');
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