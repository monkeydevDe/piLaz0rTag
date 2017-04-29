const { BaseSoundHandler } = require('./BaseSoundHandler');

class LocalSoundHandler extends  BaseSoundHandler {
  constructor() {
    super();

    const Aplay =  require('aplay')
    this.player =  new Aplay();
  }

  _playSound(name) {
    const filePath = '../data/sounds/'+name+'.wav';
    this.log.debug('LocalSound: Going to play: '+filePath);
    this.player.play(filePath);
  }
}

module.exports =  new LocalSoundHandler();