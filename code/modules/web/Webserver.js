/**
 * Is the main webserver of this application.
 * Handles all webserver stuff.
 */


const {BaseClass} = require('../../lib/BaseClass');

class Webserver extends BaseClass {

  constructor() {
    super();
    this.log.info('Starting webserver');
    let express = require('express');
    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);


    /**
     * We need a socket interface
     */
    this.expApp.get('/', function(req, res) {
      res.sendFile(__dirname + '/html/interface.html');
    });

    this.expApp.use('/jquery', express.static('./node_modules/jquery/dist'));
    this.expApp.use('/block-ui', express.static('./node_modules/block-ui'));
    this.expApp.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
    this.expApp.use('/knockout',express.static('./node_modules/knockout/build/output'));
    this.expApp.use('/assets', express.static(__dirname + '/assets'));

    let instance = this;
    this.socketIo.on('connection', function(socket) {
      instance.log.info('Websocket: A user connected');

      // tell that we need the current main state to display the correct mask in the websocket
      instance.eventHandler.mainEvents.GET_STATE.emit();

      socket.on('disconnect', function() {
        instance.log.info('Websocket: A user disconnected');
      });

      // listen for socket messages
      socket.on('socketMessage', function(msg) {
        instance.log.debug('Websocket msg: ' + msg.type + ' with value: ' + msg.value);

        // emit the message over the application so the listeners can handle this
        instance.eventHandler.webSocketEvents.SOCKET_MESSAGE_RECEIVED.emit(msg);
      });
    });


    // start the webserver
    this.http.listen(this.settings.WEBSERVER_PORT, function() {
      instance.log.info('Webserver listens on *:' + instance.settings.WEBSERVER_PORT);
    });
  }

  /**
   * Sends display data over the websocket
   * @param the type of the message like gamestatus, changestatus etc
   * @param data the payload data
   */
  sendDisplayDataOverSocket(type,data) {
    let socketData = {
      'type' : type,
      'data' : data
    }

    this.sendDataOverSocket('display',socketData);
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
