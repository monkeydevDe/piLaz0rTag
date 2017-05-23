const { TeamDeathMatchGame } = require('./TeamDeathMatchGame');
const { DeathMatchGame } = require('./DeathMatchGame');

class GameFactory {

  initGame(type,gameState) {

    if(type === 'DeathMatch') {
      return new DeathMatchGame(gameState);
    }

    if(type === 'TeamDeathMatch') {
      return new TeamDeathMatchGame(gameState);
    }

    throw new Error('No Game type found for: '+type);
  }

}

module.exports = new GameFactory();