/**
 * Watches for all relevant led events and does the light show.
 */

const {BaseClass} = require('../../lib/BaseClass');

class BaseLedHandler extends BaseClass {

  constructor() {
    super();


    this.blinkInterval = null;
    this.blinkIntervalPos = 0;
    this.blinktRepeat = -1;

    // here all intervals are configured the pattern is on duration and off duration
    this.intervals = {
      // interval when the player got hit
      hit : {
        interval: [250,250],
        repeat: 3
      },
      // interval when the player is respawning
      respawn : {
        interval : [250,150,150,250],
        repeat: -1
      }
    };

    let instance = this;
    // when shooting flash the muzzle
    this.eventHandler.gameEvents.SHOOT.on(function() {
      instance.flashMuzzleLed();
    });

    this.eventHandler.ledEvents.START_BLINK.on(function(blinkData) {
      instance.blinkReceiverLed(blinkData.type,blinkData.game);
    });

    this.eventHandler.ledEvents.STOP_BLINK.on(function(game) {
      instance.blinkInterval = null;
      instance.setStatusOnReceiverLeds(game);
    });

    this.eventHandler.ledEvents.SET.on(function(game) {
      instance.blinkInterval = null;
      instance.setStatusOnReceiverLeds(game);
    });

  }

  /**
   * Led the muzzle leds flash
   */
  flashMuzzleLed() {
    this._internalMuzzleLed(true);
    let instance = this;
    setTimeout(function() {
      instance._internalMuzzleLed(false)
    }, 150);
  }

  /**
   * Lets the receiver leds blink for n times
   * @param game
   * @param type the type to blink for
   */
  blinkReceiverLed(type,game) {
    if(this.blinkInterval !== null) {
      this.log.debug('Led: already blinking.')
    }

    this.log.info('Led: Going to blink for: '+type);

    // check if we have the given type
    let intType = this.intervals[type];
    if(intType === null || intType === undefined) {
      this.log.error('Led: could not find interval of type: '+type);
      return;
    }

    this.blinkInterval=intType.interval;
    this.blinktRepeat=intType.repeat;
    this.blinkIntervalPos = 0;

    this._handleInterval(game);
  }

  _handleInterval(game) {

    // the interval was canceled so stop
    if(this.blinkInterval === null) {
      return;
    }

    if(this.blinktRepeat === 0) {
      this.eventHandler.ledEvents.STOP_BLINK.emit(game);
      return;
    }

    // check if we have to start in the interval over again
    if(this.blinkIntervalPos >= this.blinkInterval.length) {
      // do not blink forever ?
      if(this.blinktRepeat !== -1) {
        this.blinktRepeat--;
      }
      this.blinkIntervalPos = 0;
    }

    // turn the led on every 2 pos in the interval
    let ledOn = (this.blinkIntervalPos % 2 == 0);
    let duration = this.blinkInterval[this.blinkIntervalPos];

    // next time we call this we have to get the next position in this interval.
    this.blinkIntervalPos++;

    this.log.debug('Led: turn receiver led '+ledOn+' for duration: '+duration);

    this.setStatusOnReceiverLeds(game,ledOn);

    let instance = this;
    setTimeout(function() {
      instance._handleInterval(game);
    },duration)

  }


  /**
   * This must be implemented in the extending class.
   * @param game the game
   * @param on when set not the game.player.status.led.on is used
   */
  setStatusOnReceiverLeds(game,on) {
    this.log.error('Led: Implement me: '+ this.setStatusOnReceiverLeds.name);
  }



  /**
   * This has to be implemeted in the actual led implementation
   * @param on if to turn on or off the led
   */
  _internalMuzzleLed(on) {
    this.log.error('Led: Implement me: ' + this.internalMuzzleLed.name);
  }
}


exports.BaseLedHandler = BaseLedHandler;