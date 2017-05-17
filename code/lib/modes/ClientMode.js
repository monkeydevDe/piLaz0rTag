const { BaseClass } = require('./../BaseClass');

/**
 * Handles the mode when being a client.
 */
class ClientMode extends BaseClass {

  /**
   * Constructor
   * @param masterHost the host of the master the client wants to connect to
   */
  constructor(masterHost) {
    super();

    this.socketMasterHost = 'http://'+masterHost+':'+this.settings.WEBSERVER_PORT;

    this.socketIo = require('socket.io-client')(this.socketMasterHost+'/master');
  }

}