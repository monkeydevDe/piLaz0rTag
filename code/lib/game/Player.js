class Player {


  constructor(id,team,lives,health,respawnTime,shootStrength,mags,roundsPerMag,reloadTime,shootDelay) {

    this.log = require('../Logger');

    this.id = id;
    this.team = team;
    this.health = health;
    this.mags = mags;
    this.lives = lives;
    this.shootStrength = shootStrength;
    this.roundsPerMag = roundsPerMag;
    this.reloadTime = reloadTime;
    this.shootDelay = shootDelay;
    this.respawnTime = respawnTime;

    this.status = {
      'health' : this.health,
      'mags' : mags,
      'lives' : this.lives,
      'roundsInMag' : this.roundsPerMag,
      'reloading' : false,
      'shot' : false,
      'respawning': false
    }
  }

  checkPlayerStatus() {

    if(this.status.lives <= 0) {
      this.log.debug('Player: Player has no lives left no action');
      return false;
    }

    if(this.status.health <= 0) {
      this.log.debug('Player: Player is dead no action');
      return false;
    }

    if(this.status.respawning == true) {
      this.log.debug('Player: Player is respawning no action');
      return false;
    }

    return true;
  }

  checkPlayerStatusWithReload() {

    if(this.status.reloading == true) {
      this.log.debug('Player: Player is currently reloading no action');
      return false;
    }

    return this.checkPlayerStatus();
  }
}

exports.Player = Player;