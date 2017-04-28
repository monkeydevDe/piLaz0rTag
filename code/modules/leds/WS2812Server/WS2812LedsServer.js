//https://www.hacksparrow.com/tcp-socket-programming-in-node-js.html

class WS2812LedsServer {

  constructor() {
    this.ws281x = require('rpi-ws281x-native');
    this.net = require('net');
    this.log = require('../../../lib/Logger');
    this.settings = require('../../../lib/Settings');

    this.numLeds = this.settings.WS2812_CFG.MUZZLE_FLASH_LEDS.length + this.settings.WS2812_CFG.HIT_LEDS.length;

    //look at dreamcode.js example what is possible
    this.ws281x.init(this.numLeds, {colorFormat: 'grb'});
    this.ws281x.setBrightness(this.settings.WS2812_CFG.BRIGHTNESS);

    this.pixelData = new Uint32Array(this.numLeds);

    this.pixelData[0] = 0x00FF00;

    this.ws281x.render(this.pixelData);

    const instance = this;
    process.on('SIGINT', function() {
      instance.ws281x.reset();
      process.nextTick(function() {
        process.exit(0);
      });
    });


    const HOST = this.settings.WS2812_CFG.HOST;
    const PORT = this.settings.WS2812_CFG.PORT;

    this.log.info('Net: starting server on: ' + HOST + ':' + PORT);

    this.net.createServer(function(sock) {

      // We have a connection - a socket object is assigned to the connection automatically
      instance.log.info('Net: Connect from: ' + sock.remoteAddress + ':' + sock.remotePort);

      // Add a 'data' event handler to this instance of socket
      sock.on('data', function(data) {

        const stringData = data.toString().trim();

        instance.log.debug('Net: Data from ' + sock.remoteAddress + ' received: ' + stringData);

        // split the data
        const splitData = stringData.split(',');


        // take the first element from the array which is the command
        var command = splitData.shift();
        instance.log.debug('Led: Got command: ' + command);

        switch(command) {
          case 'B':
            instance.log.info('LED: Got Brightness command');
            let msg1 = instance.setBrightness(splitData);
            if(msg1 !== null) {
              sock.write('Not OK: ' + msg1);
              return;
            }
            break;
          case 'C':
            instance.log.info('LED: Got Color command');
            let msg = instance.setColor(splitData);
            if(msg !== null) {
              sock.write('Not OK: ' + msg);
              return;
            }
            break;
          default:
            instance.log.error('LED: Got unknown command: ' + command);
            sock.write('NOT OK: Unkown command: ' + command);
            return;
        }


        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('OK');
      });

      // Add a 'close' event handler to this instance of socket
      sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
      });

    }).listen(PORT, HOST);
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

