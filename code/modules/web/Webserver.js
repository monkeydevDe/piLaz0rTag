/**
 * Is the main webserver of this application.
 * Handles all webserver stuff.
 */

class Webserver {

  constructor() {

    const instance = this;

    this.log = require('../../lib/Logger.js');
    this.log.info('Starting webserver');

    let settings = require('../settings');


    let express = require('express');
    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);
    this.eventHandler = require('../../lib/LaserTagEventHandler');

    /**
     * server the index.html
     */
    this.expApp.get('/', function(req, res) {
      res.send('<h1>Hello world</h1>');
    });

    /**
     * We need a socket interface
     */
    this.expApp.get('/socket', function(req, res) {
      res.sendFile(__dirname + '/html/socketInterface.html');
    });

    this.expApp.use('/jquery', express.static('./node_modules/jquery/dist'));


    this.socketIo.on('connection', function(socket) {
      instance.log.info('Websocket: A user connected');
      socket.on('disconnect', function() {
        instance.log.info('Websocket: a user disconnected');
      });

      // listen for socket messages
      socket.on('socketMessage', function(msg) {
        instance.log.info('Websocket msg: ' + msg.type + ' with value: ' + msg.value);
        // emit the message over the application so the listeners can handle this
        instance.eventHandler.emitWebsocketMsg(msg);
      });
    });


    // start the webserver
    this.http.listen(settings.WEBSERVER_PORT, function() {
      instance.log.info('Webserver listens on *:' + settings.WEBSERVER_PORT);
    });
  }


}

// run as a singleton is this the right way ?
exports = new Webserver();