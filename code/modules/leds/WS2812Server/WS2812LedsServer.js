//https://www.hacksparrow.com/tcp-socket-programming-in-node-js.html

class WS2812LedsServer {

  constructor() {
    this.ws281x = require('rpi-ws281x-native');
    this.log = require('../../../lib/Logger');
    this.settings = require('../../../lib/Settings');

    this.numLeds = this.settings.WS2812_CFG.MUZZLE_FLASH_LEDS.length + this.settings.WS2812_CFG.HIT_LEDS.length;

    //look at dreamcode.js example what is possible
    this.ws281x.init(this.numLeds, {colorFormat: 'grb'});
    this.ws281x.setBrightness(this.settings.WS2812_CFG.BRIGHTNESS);

    this.pixelData = new Uint32Array(this.numLeds);

    this.ws281x.render(this.pixelData);

    this.socketHost = 'http://localhost:'+this.settings.WEBSERVER_PORT;
    this.socketIo = require('socket.io-client')(this.socketHost);

    const instance = this;

    this.socketIo.on('connect', function(){
      instance.log.info('WS2812LedServer: Connected to '+instance.socketHost);
    });

    this.socketIo.on('ws2812led', function(data){

      const stringData = data.toString().trim();

      instance.log.debug('WS2812LedServer: Data received: ' + stringData);

      // split the data
      const splitData = stringData.split(',');

      // take the first element from the array which is the command
      var command = splitData.shift();
      instance.log.debug('WS2812LedServer: Got command: ' + command);

      switch(command) {
        case 'B':
          instance.log.info('WS2812LedServer: Got Brightness command');
          let msg1 = instance.setBrightness(splitData);
          if(msg1 !== null) {
            return;
          }
          break;
        case 'C':
          instance.log.info('WS2812LedServer: Got Color command');
          let msg = instance.setColor(splitData);
          if(msg !== null) {
            return;
          }
          break;
        default:
          instance.log.error('WS2812LedServer: Got unknown command: ' + command);
          return;
      }

    });


    process.on('SIGINT', function() {
      instance.socketIo.close();
      process.nextTick(function() {
        process.exit(0);
      });
    });
  }

  /**
   * Sets the brightness on the leds
   * @param brightness
   * @returns {string}
   */
  setBrightness(brightness) {
    if(brightness.length !== 1) {
      this.log.error('Led Brightness: No brightness given.');
      return 'Led Brightness: No brightness given.';
    }

    this.ws281x.setBrightness(new Number(brightness[0]));

    return null;
  }

  /**
   * Sets the color on the leds
   * @param colorSettings string of leds infos to set like 0,0xFF0000,1,0x00FF00...
   */
  setColor(colorSettings) {

    if(colorSettings.length % 2 !== 0) {
      this.log.error('Led Color: No even infos.');
      return 'Led Color: No even infos.';
    }

    for(var i = 0; i < colorSettings.length; i += 2) {
      let ledNum = colorSettings[i];
      let ledColor = colorSettings[i + 1];
      this.log.debug('Led: Set Color: ' + ledNum + ' = ' + ledColor);
      this.pixelData[ledNum] = ledColor;
    }

    this.ws281x.render(this.pixelData);

    return null;
  }
}

new WS2812LedsServer();

