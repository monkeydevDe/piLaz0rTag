/**
 * Plays a mp3 sound when requested
 */

const SoundPlayer = require('soundplayer')


class Mp3Sound {

  constructor(log, eventHandler) {

    this.log = log;
    this.player = new SoundPlayer();
    this.eventHandler = eventHandler
        

    const instance = this;

    instance.player.sound('../audio/shot.mp3');
    eventHandler.on('ir_received', (irMsg) => {
      instance.log.info('Play shoot' + irMsg);
      instance.player.sound('../audio/shot.mp3');
    });

  }

}

exports.Mp3Sound = Mp3Sound;