/**
 * The actual game handling everything
 */

const { BaseClass } = require('../BaseClass');

class BaseGame extends BaseClass {

  constructor(player, opts) {
    super();

    this.opts = opts;
    
    this.id = new Date();
    this.player = player;
    this.eventsToClean = [];

    this.eventHandler.ledEvents.SET.emit(this);

    let instance = this;

    // register shoot handling when the user hits the button :)
    this.addEventToGame(this.eventHandler.buttonEvents.SHOOT_BTN.on(function() {
      instance.shoot();
    },true));

    this.addEventToGame(this.eventHandler.buttonEvents.RELOAD_BTN.on(function() {
       instance.reload();
    },true));

    this.addEventToGame(this.eventHandler.gameEvents.RELOAD_FINISHED.on(function() {
       instance.reloadDone();
    },true));

    this.addEventToGame(this.eventHandler.gameEvents.GET_STATUS.on(function() {
       instance.propergateGameStatus();
    },true));

    this.addEventToGame(this.eventHandler.gameEvents.IR_HIT_MESSAGE.on(function(hitData) {
       instance.handlePlayerHit(hitData);
    },true));

    this.addEventToGame(this.eventHandler.gameEvents.PLAYER_RESPAWNED.on(function() {
       instance.handleRespawnDone();
    },true));
  }

  /**
   * Call this when registering an event so it can be removed when the game is stopped.
   * @param event
   */
  addEventToGame(event) {
    this.eventsToClean.push(event);
  }

  /**
   * Cleans up all events so the game can vanish :)
   */
  cleanUpEvents() {
    for(let idx in this.eventsToClean) {
      this.eventsToClean[idx].removeCleanupListeners();
    }
  }

  /**
   * This is called when we received an player hit message.
   * @param hitData
   */
  handlePlayerHit(hitData) {
    if(this.player.team == hitData.team && this.player.id == hitData.id) {
      this.log.info('Game: You hit your self. Do nothing :)');
      return;
    }

    this._handlePlayerHit(hitData);
  }

  /**
   * This is called when the player is respawend.
   */
  handleRespawnDone() {
    this.log.info('Game: Player respawning done.');
    this.eventHandler.ledEvents.STOP_BLINK.emit(this);
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
    this.log.error('Game: Implement me: '+this._handlePlayerHit.name);
  }

  /**
   * This will emit all events which handle the game status.
   */
  propergateGameStatus() {
    this.eventHandler.mainEvents.STATE_DATA_UPDATED.emit(this.player);
  }

  /**
   * This is called when the game decided that the player is damaged.
   * @param strength
   */
  onHit(strength) {
    this.log.info('Game: got hit with: '+strength);

    let playerActionStatus = this.checkPlayerStatus();
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


        if(this.player.status.lives <= 0) {
          this.eventHandler.gameEvents.GAME_OVER.emit();
          return;
        }

        this.player.status.respawning = true;
        this.log.info('Game: Respawn player in: '+this.player.respawnTime);
        this.eventHandler.ledEvents.START_BLINK.emit({type: 'respawn', game: this});
        this.eventHandler.gameEvents.PLAYER_DIED.emit();
        const instance = this;
        setTimeout(function() {
          instance.eventHandler.gameEvents.PLAYER_RESPAWNED.emit();
        },this.player.respawnTime);
      }
    } else {
      this.eventHandler.ledEvents.START_BLINK.emit({type: 'hit', game: this});
      this.eventHandler.gameEvents.PLAYER_HIT.emit();
    }
    

    this.propergateGameStatus();
  }

  /**
   * Handles shooting
   */
  shoot() {
    this.log.info('Game: Shoot');

    let playerActionStatus = this.checkPlayerStatusWithReload();
    if(playerActionStatus == false) {
      this.log.info('Game: Player is not in the status to perform shooting.');
      return;
    }

    if(this.player.status.shot == true) {
      this.log.debug('Game: Player is shooting no shooting possible');
      return;
    }

    if(this.player.status.mags === 0 && this.player.status.roundsInMag === 0) {
      this.log.debug('Game: no bullets and mags left');
      this.eventHandler.gameEvents.PLAYER_EMPTY_MAG.emit();
      return;
    }

    if(this.player.status.roundsInMag === 0) {
      this.log.debug('Game: no bullets left in current mag');
      this.eventHandler.gameEvents.PLAYER_EMPTY_MAG.emit();
      return;
    }

    this.player.status.roundsInMag--;


    this.eventHandler.gameEvents.SHOOT.emit(this.player);
    this.propergateGameStatus();
  }

  /**
   * Handles reloading
   */
  reload() {
    this.log.info('Game: Reload');

    let playerActionStatus = this.checkPlayerStatusWithReload();
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

    let instance = this;
    setTimeout(function() {
      instance.eventHandler.gameEvents.RELOAD_FINISHED.emit();
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

  /**
   * Check if the player is alive
   * @returns {*}
   */
  checkPlayerStatus() {

    if(this.player.status.lives <= 0) {
      this.log.debug('Player: Player has no lives left no action');
      return false;
    }

    if(this.player.status.health <= 0) {
      this.log.debug('Player: Player is dead no action');
      return false;
    }

    if(this.player.status.respawning == true) {
      this.log.debug('Player: Player is respawning no action');
      return false;
    }

    return true;
  }

  /**
   * Check if the player is alive and if so if he is reloading
   * @returns {*}
   */
  checkPlayerStatusWithReload() {

    if(this.player.status.reloading == true) {
      this.log.debug('Player: Player is currently reloading no action');
      return false;
    }

    return this.checkPlayerStatus();
  }

}

exports.BaseGame = BaseGame;