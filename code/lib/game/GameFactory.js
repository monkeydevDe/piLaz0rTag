const { TeamDeathMatchGame } = require('./TeamDeathMatchGame');
const { DeathMatchGame } = require('./DeathMatchGame');

class GameFactory {

  initGame(type,player) {

    if(type === 'DeathMatch') {
      return new DeathMatchGame(player);
    }

    if(type === 'TeamDeathMatch') {
      return new TeamDeathMatchGame(player);
    }

    throw new Error('No Game type found for: '+type);
  }

}

module.exports = new GameFactory();