/**
 * Is the main webserver of this application.
 * Handles all webserver stuff.
 */

class Webserver {

  constructor() {
    this.log = require('../../lib/Logger.js');
    this.log.info('Starting webserver');

    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);

    this.socketIo.on('connection', function(socket){
      log.info('A user connected');
    });
  }



}

// run as a singleton is this the right way ?
exports = new Webserver();