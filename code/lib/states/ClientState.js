const { BaseClass } = require('./../BaseClass');

/**
 * Handles the state when being a client.
 */
class ClientState extends BaseClass {

  /**
   * Constructor
   * @param masterHost the host of the master the client wants to connect to
   */
  constructor(masterHost) {
    super();

    this.socketMasterHost = 'http://'+masterHost+':'+this.settings.WEBSERVER_PORT;

    this.log.info('ClientMode: Trying to connect to: '+this.socketMasterHost);

    this.socketIo = require('socket.io-client')(this.socketMasterHost+'/master');

    const instance = this;
    this.socketIo.on('connect', function(){
      instance.log.info('ClientMode: Connected to '+instance.socketMasterHost);
    });

    this.socketIo.on('connect_error',function() {
      instance.log.error('ClientMode: Error connecting to '+instance.socketMasterHost);
      instance.socketIo.close();
      instance.eventHandler.mainEvents.CHANGE_STATE.emit({state: 'SELECT_MODE'});

    });
  }

}

exports.ClientState = ClientState;