class WS2812LedsServer {

  constructor() {
    this.numLeds = 2;

    this.ws281x = require('rpi-ws281x-native');
    //look at https://github.com/jgarff/rpi_ws281x/blob/master/main.c for the type
    // https://github.com/jgarff/rpi_ws281x/issues/122
    this.ws281x.init(this.numLeds,{'strip_type' : 'WS2811_STRIP_GBR'});
    this.ws281x.setBrightness(255);

    this.pixelData = new Uint32Array(this.numLeds);

    this.ws281x.render(this.pixelData);

    var instance = this;
    process.on('SIGINT', function () {
      instance.ws281x.reset();
      process.nextTick(function () { process.exit(0); });
    });

    this.net = require('net');

    var HOST = '127.0.0.1';
    var PORT = 6969;

    this.net.createServer(function(sock) {

      // We have a connection - a socket object is assigned to the connection automatically
      console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

      // Add a 'data' event handler to this instance of socket
      sock.on('data', function(data) {

        const stringData = data.toString();

        const splitData = stringData.split(',');
        if(splitData.length % 2 != 0) {
          return;
        }

        for(var i = 0; i < splitData.length; i+=2) {
          let ledNum = splitData[i];
          let ledColor = splitData[i+1];
          instance.pixelData[ledNum] = ledColor;
        }

        instance.ws281x.render(instance.pixelData);


        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('OK');

      });

      // Add a 'close' event handler to this instance of socket
      sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
      });

    }).listen(PORT, HOST);

  }
}

new WS2812LedsServer();

