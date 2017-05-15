/**
 * Led Handler for mocking or if you have none :)
 */
const {BaseLedHandler} = require('./BaseLedHandler')

class WS2812LedHandler extends BaseLedHandler {

  constructor() {
    super();

    //this._initServerProcess();
    this.webserver = require('../web/Webserver');
  }

  

  /**
   * The server has to run as root because of kernel stuff :)
   * @private
   */
  _initServerProcess() {
    let exec = require('child_process').exec;
    this.serverProcess = exec(__dirname+'/WS2812Server/startWs2812Server.sh');
    let instance = this;
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
    let setOn = (on !== undefined) ? on : game.player.status.led.on;
    let colorToSet = (setOn === true) ? this.settings.WS2812_CFG.TEAM_COLORS[game.player.status.led.color] : '0x000000';
    let data = '';
    for(let idx in this.settings.WS2812_CFG.HIT_LEDS) {
      data+=','+this.settings.WS2812_CFG.HIT_LEDS[idx]+','+colorToSet;
    }
    this._writeColordToServer(data);
  }

  _writeColordToServer(colors) {
    let data = 'C'+colors;
    this.log.debug('WS2812LED: sending to server: '+data);
    this.webserver.sendDataOverSocket('ws2812led',data);

  }
}

module.exports = new WS2812LedHandler();