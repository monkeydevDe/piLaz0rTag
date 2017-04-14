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


    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);

    this.expApp.get('/', function(req, res){
      res.send('<h1>Hello world</h1>');
    });

    /**
     * We need a socket interface
     */
    this.expApp.get('/socket',function(req,res) {
      res.sendFile(__dirname + '/html/socketInterface.html');
    });


    this.socketIo.on('connection', function(socket){
      instance.log.info('Websocket: A user connected');
      socket.on('disconnect', function(){
        instance.log('Websocket: a user disconnected');
      });
    });


    // start the webserver
    this.http.listen(settings.WEBSERVER_PORT, function(){
      instance.log.info('Webserver listens on *:'+settings.WEBSERVER_PORT);
    });
  }





}

// run as a singleton is this the right way ?
exports = new Webserver();