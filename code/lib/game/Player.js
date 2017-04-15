class Player {


  constructor(id,team,lives,health,respawnTime,shootStrength,mags,roundsPerMag,reloadTime,shootDelay) {
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
}

exports.Player = Player;