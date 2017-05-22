const { BaseState } = require('./BaseState');

/**
 * Handles the state when being a client.
 */
class ClientState extends BaseState {

  /**
   * Constructor
   * @param masterHost the host of the master the client wants to connect to
   */
  constructor(masterHost,uniqueId) {
    super();

    if(uniqueId !== undefined) {
      this.uniqueId = uniqueId;
    }

    this.socketMasterHost = 'http://'+masterHost+':'+this.settings.WEBSERVER_PORT;

    this.log.info('ClientState: Trying to connect to: '+this.socketMasterHost);

    this.socketIo = require('socket.io-client')(this.socketMasterHost+'/master');

    const instance = this;
    this.socketIo.on('connect', function(){
      instance.log.info('ClientState: Connected to '+instance.socketMasterHost);
    });

    this.socketIo.on('connect_error',function() {
      instance.log.error('ClientState: Error connecting to '+instance.socketMasterHost);
      instance.socketIo.close();
      instance.eventHandler.mainEvents.CHANGE_STATE.emit({state: 'SELECT_MODE'});

    });
  }

}

exports.ClientState = ClientState;