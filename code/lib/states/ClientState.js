const {BaseState} = require('./BaseState');

/**
 * Handles the state when being a client.
 */
class ClientState extends BaseState {

  /**
   * Constructor
   * @param masterHost the host of the master the client wants to connect to
   */
  constructor(masterHost, uniqueId) {
    super();

    if(uniqueId !== undefined) {
      this.uniqueId = uniqueId;
    }

    this.socketMasterHost = 'http://' + masterHost + ':' + this.settings.WEBSERVER_PORT;

    this.log.info('ClientState: Trying to connect to: ' + this.socketMasterHost);

    this.socketIo = require('socket.io-client')(this.socketMasterHost + '/master');

    this.socketId = null;

    const instance = this;
    this.socketIo.on('connect', function(e) {
      instance.socketId = instance.socketIo.io.engine.id;
      instance.log.info('ClientState: Connected to ' + instance.socketMasterHost);
      // send uniqueId to master
      instance.socketIo.emit('message', {type: 'setUniqueId', data: instance.uniqueId});
    });

    this.socketIo.on('connect_error', function() {
      instance.log.error('ClientState: Error connecting to ' + instance.socketMasterHost);
      instance.socketIo.close();
      instance.eventHandler.mainEvents.CHANGE_STATE.emit({state: 'SELECT_MODE'});
    });

    /**
     * When the master sends updated data to all clients
     * Normally we only want to update the displays.
     */
    this.socketIo.on('updateData', function(msg) {
      instance.log.info('ClientState: Master sends data to update.');
      instance.eventHandler.mainEvents.STATE_DATA_UPDATED.emit(msg);
    });

    /**
     * When the game has to start
     */
    this.socketIo.on('startGame', function(msg) {
      // get only the data for the client
      const masterChannelClientId = '/master#'+instance.socketId;
    });
  }

}

exports.ClientState = ClientState;