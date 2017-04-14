/**
 * Is the main webserver of this application.
 * Handles all webserver stuff.
 */

class Webserver {

  constructor() {

    log.info('Starting webserver');

    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);
  }



}

// run as a singleton is this the right way ?
const log = require('../../lib/Logger.js');
exports = new Webserver(log);