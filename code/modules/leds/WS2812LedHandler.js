/**
 * Led Handler for mocking or if you have none :)
 */
const {BaseLedHandler} = require('./BaseLedHandler')

class WS2812LedHandler extends BaseLedHandler {

  constructor() {
    super();

    let net = require('net');
    this.client = new net.Socket();
    this.settings = require('../settings');

    const instance = this;

    this.client.connect(this.settings.WS2812_CFG.PORT, this.settings.WS2812_CFG.HOST, function() {
      instance.log.info('WS2812LED: Connected: ' + instance.settings.WS2812_CFG.HOST + ':' + instance.settings.WS2812_CFG.PORT);
    });

    this.client.on('data', function(data) {
      instance.log.debug('WS2812LED: server answer: '+data);
      if(data.lastIndexOf('Not OK:') === 0) {
        instance.log.error('WS2812LED: server error: '+data);
      }
      // Close the client socket completely
      //client.destroy();
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

  _writeColordToServer(colors) {
    let data = 'C'+colors;
    this.log.debug('WS2812LED: sending to server: '+data);
    this.client.write(data);
  }
}

module.exports = new WS2812LedHandler();