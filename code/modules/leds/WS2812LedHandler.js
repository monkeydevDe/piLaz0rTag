/**
 * Led Handler for mocking or if you have none :)
 */
const {BaseLedHandler} = require('./BaseLedHandler')

class WS2812LedHandler extends BaseLedHandler {

  constructor() {
    super();

    //this._initServerProcess();

    this.serverConnected = false;

    this.net = require('net');

    this.settings = require('../settings');

    this._connectToServer();



  }

  _connectToServer() {
    if(this.serverConnected === true) {
      this.log.info('WS2812LED: Connected');
      return;
    }

    this.client = new this.net.Socket();

    const instance = this;

    this.client.connect(this.settings.WS2812_CFG.PORT, this.settings.WS2812_CFG.HOST, function() {
      instance.log.info('WS2812LED: Connected: ' + instance.settings.WS2812_CFG.HOST + ':' + instance.settings.WS2812_CFG.PORT);
      instance.serverConnected = true;
    });

    this.client.on('error',function(data) {
      instance._handleNotConnected();
    });

    this.client.on('data', function(data) {
      instance.log.debug('WS2812LED: server answer: '+data);
      if(data.lastIndexOf('Not OK:') === 0) {
        instance.log.error('WS2812LED: server error: '+data);
      }
    });

    this.client.on('close', function() {
      instance._handleNotConnected();
    });
  }

  _handleNotConnected() {
    const instance = this;
    this.serverConnected = false;
    setTimeout(function() {
      instance._connectToServer();
    },1000);
  }
  

  /**
   * The server has to run as root because of kernel stuff :)
   * @private
   */
  _initServerProcess() {
    let exec = require('child_process').exec;
    this.serverProcess = exec(__dirname+'/WS2812Server/startWs2812Server.sh');
    const instance = this;
    this.serverProcess.stderr.on('data', function(data) {
      instance.log.error('WS2812LED Server error: '+data);
    });
  }

  _internalMuzzleLed(on) {
    let colorToSet = (on === true) ? this.settings.WS2812_CFG.MUZZLE_FLASH_COLOR_ON : this.settings.WS2812_CFG.MUZZLE_FLASH_COLOR_OFF;
    let data = '';
    for(let idx in this.settings.WS2812_CFG.MUZZLE_FLASH_LEDS) {
      data+=','+this.settings.WS2812_CFG.MUZZLE_FLASH_LEDS[idx]+','+colorToSet;
    }

    this._writeColordToServer(data);
  }

  setStatusOnReceiverLeds(game,on) {
    let colorToSet = (on === true) ? this.settings.WS2812_CFG.TEAM_COLORS[game.player.team] : '0x000000';
    let data = '';
    for(let idx in this.settings.WS2812_CFG.HIT_LEDS) {
      data+=','+this.settings.WS2812_CFG.HIT_LEDS[idx]+','+colorToSet;
    }
    this._writeColordToServer(data);
  }

  _writeColordToServer(colors) {

    if(this.serverConnected === false) {
      return;
    }

    let data = 'C'+colors;
    this.log.debug('WS2812LED: sending to server: '+data);
    this.client.write(data);
  }
}

module.exports = new WS2812LedHandler();