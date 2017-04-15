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
     * We need a socket interface
     */
    this.expApp.get('/', function(req, res) {
      res.sendFile(__dirname + '/html/interface.html');
    });

    this.expApp.use('/jquery', express.static('./node_modules/jquery/dist'));
    this.expApp.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
    this.expApp.use('/knockout',express.static('./node_modules/knockout/build/output'));
    this.expApp.use('/assets', express.static(__dirname + '/assets'));

    this.socketIo.on('connection', function(socket) {
      instance.log.info('Websocket: A user connected');

      instance.eventHandler.emitGameGetStatus();

      socket.on('disconnect', function() {
        instance.log.info('Websocket: A user disconnected');
      });

      // listen for socket messages
      socket.on('socketMessage', function(msg) {
        instance.log.debug('Websocket msg: ' + msg.type + ' with value: ' + msg.value);
        // emit the message over the application so the listeners can handle this
        instance.eventHandler.emitWebsocketMsg(msg);
      });
    });


    // start the webserver
    this.http.listen(settings.WEBSERVER_PORT, function() {
      instance.log.info('Webserver listens on *:' + settings.WEBSERVER_PORT);
    });
  }

  /**
   * Sends display data over the websocket
   * @param data
   */
  sendDisplayDataOverSocket(data) {
    this.sendDataOverSocket('display',data);
  }

  /**
   * Sends a message over socket with the given type.
   * @param type
   * @param data
   */
  sendDataOverSocket(type,data) {
    this.log.debug('Websocket: sending type: '+type);
    this.socketIo.emit(type, data);
  }
}

// run as a singleton is this the right way ?
module.exports = new Webserver();