const { BaseState } = require('./BaseState');
const { ClientSetupData } = require('./ClientSetupData');

/**
 * Handles the Lobby Master State
 */
class MasterState extends BaseState {
  constructor() {
    super();

    this.log.info("MasterState: Starting master state.");

    this.clients = {};
    this.webserver = require('../../modules/web/Webserver');

    // set the first game mode
    this.currentGameMode = this.settings.GAME_MODES[0];

    const instance = this;

    this.eventHandler.webSocketEvents.MASTER_CLIENT_CONNECTED.on(function(socketId) {
      instance._newClientConnected(socketId);
    },true);

    this.eventHandler.webSocketEvents.MASTER_CLIENT_DISCONNECTED.on(function(socketId) {
      instance._clientDisconnected(socketId);
    },true);

    this.eventHandler.webSocketEvents.SOCKET_MESSAGE_RECEIVED.on(function(eventMsg) {
      if(eventMsg.msg.type === 'setUniqueId') {
        instance._setUniqueIdOnClient(eventMsg.socketId,eventMsg.msg.data)
      }
    },true);
  }

  changeGameMode(newGameMode) {
    this.log.info("MasterState: Change gameMode from: "+this.currentGameMode+" to: "+newGameMode);
    this.currentGameMode = newGameMode;
    this.changedGameSettings();
  }

  /**
   * When a new client connected to the master
   */
  _newClientConnected(socketId) {
    this.log.info('MasterState: A new client connected with socketId: '+socketId);
    this.clients[socketId] = new ClientSetupData(socketId);
  }

  /**
  * when a client disconnected
  */
  _clientDisconnected(socketId) {
    this.log.info('MasterState: A client disconnected with socketId: '+socketId);
    this.clients[socketId] = null;
    delete this.clients[socketId];
    this._changedGameSettings();
  }

  /**
   * Sets the uniqueId at the client
   * @param socketId
   * @param uniqueId
   * @private
   */
  _setUniqueIdOnClient(socketId,uniqueId) {
    this.log.info('MasterState: Set uniqueId: '+uniqueId+' at client with socketId: '+socketId);
    this.clients[socketId].uniqueId = uniqueId;
    this._changedGameSettings();
  }


  /**
   * When game settings like start time scoring points etc where changed
   */
  _changedGameSettings() {
    const settings = {
      avaibleGameModes:this.settings.GAME_MODES,
      currentGameMode: this.currentGameMode,
      clients: this.clients
    };
    this.webserver.sendMasterModeData('updateData',settings);
  }
}

exports.MasterState = MasterState;