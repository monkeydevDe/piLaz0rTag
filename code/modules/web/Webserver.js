/**
 * Is the main webserver of this application.
 * Handles all webserver stuff.
 */


const {BaseClass} = require('../../lib/BaseClass');

class Webserver extends BaseClass {

  constructor() {
    super();
    this.log.info('Starting webserver');
    const express = require('express');
    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);

    // this is for master mode all clients will connect here and only here the data for master client is send
    this.masterSocketIo = this.socketIo .of('/master');


    this._declareExpressUses(express);

    const instance = this;
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

    this._masterSocketSetup();


    // start the webserver
    this.http.listen(this.settings.WEBSERVER_PORT, function() {
      instance.log.info('Webserver listens on *:' + instance.settings.WEBSERVER_PORT);
    });
  }

  /**
   * Setups the master websocket which handles the main lobby mode of the game
   * @private
   */
  _masterSocketSetup() {
    const instance = this;

    // register handlers for the master client mode on websockets
    this.masterSocketIo.on('connection', function(socket) {
      instance.log.info('Websocket_Master: A user connected.');

      instance.eventHandler.webSocketEvents.MASTER_CLIENT_CONNECTED.emit(socket.id);

      // handle client disconnecting
      socket.on('disconnect', function() {
        instance.log.info('Websocket_Master: A user disconnected');
        instance.eventHandler.webSocketEvents.MASTER_CLIENT_DISCONNECTED.emit(socket.id);
      });

      // when a message was received
      socket.on('message', function(msg) {
        instance.log.debug('Websocket_Master msg: ' + msg.type);
        // emit the message over the application so the listeners can handle this
        const eventMsg = {socketId : socket.id, msg: msg};
        instance.eventHandler.webSocketEvents.SOCKET_MASTER_MESSAGE_RECEIVED.emit(eventMsg);
      });
    });
  }

  /**
   * Some express use path setup.
   * @private
   */
  _declareExpressUses(express) {
    this.expApp.get('/', function(req, res) {
      res.sendFile(__dirname + '/html/interface_new.html');
    });

    this.expApp.use('/templates', express.static(__dirname+'/html/templates'));
    this.expApp.use('/jquery', express.static('./node_modules/jquery/dist'));
    this.expApp.use('/block-ui', express.static('./node_modules/block-ui'));
    this.expApp.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
    this.expApp.use('/knockout',express.static('./node_modules/knockout/build/output'));
    this.expApp.use('/assets', express.static(__dirname + '/assets'));
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
    this.socketIo.emit(type, data);
  }

  /**
   * Sends data over the master socket.
   * @param type the type of the message
   * @param data the payload to send
   */
  sendMasterModeData(type,data) {
    this.masterSocketIo.emit(type,data);
  }

}

// run as a singleton is this the right way ?
module.exports = new Webserver();
