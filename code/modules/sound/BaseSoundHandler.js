const { BaseClass } = require('../../lib/BaseClass');

class BaseSoundHandler extends BaseClass {

  constructor() {
    super();

    const instance = this;
    this.eventHandler.gameEvents.SHOOT.on(function() {
      instance._playSound('shot');
    })

    this.eventHandler.gameEvents.PLAYER_DIED.on(function() {
      instance._playSound('dead');
    });

    this.eventHandler.gameEvents.PLAYER_HIT.on(function() {
      instance._playSound('hit');
    });

    this.eventHandler.buttonEvents.RELOAD_BTN.on(function() {
      instance._playSound('reload_start');
    });

    this.eventHandler.gameEvents.RELOAD_FINISHED.on(function() {
      instance._playSound('reload_done');
    });

    this.eventHandler.gameEvents.PLAYER_EMPTY_MAG.on(function() {
      instance._playSound('mag_empty');
    });
  }
  

  /**
   * Plays the sound by the given name
   * @param name
   * @private
   */
  _playSound(name) {
    this.log.error('Sound: Implement me: ' + this._playSound.name);
  }

}

exports.BaseSoundHandler = BaseSoundHandler;