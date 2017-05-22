/**
 * Holds the setup data of the client
 */
class ClientSetupData {
  constructor(socketId) {

    this.socketId = socketId;

    this.uniqueId = '';
    this.id = 1;
    this.team = '';
    this.health = 100;
    this.mags = 3;
    this.lives = 3;
    this.shootStrength = 100;
    this.roundsPerMag = 30;
    this.reloadTime = 2000;
    this.shootDelay = 150;
    this.respawnTime = 10000;
  }
}

exports.ClientSetupData = ClientSetupData;