class GameFactory {

  initGame(type,player) {

    if(type === 'DeathMatch') {
      const { DeathMatchGame } = require('./DeathMatchGame');
      return new DeathMatchGame(player);
    }

    if(type === 'TeamDeathMatch') {
      const { TeamDeathMatchGame } = require('./TeamDeathMatchGame');
      return new TeamDeathMatchGame(player);
    }

    throw new Error('No Game type found for: '+type);
  }

}

module.exports = new GameFactory();