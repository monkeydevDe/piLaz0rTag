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

    if(this.settings.MASTER_MODE_ADD_LOCAL_CLIENT === true) {
      this.log.info('MasterState: Add local client');
      const localClient = new ClientSetupData('local');
      localClient.uniqueId = 'local'
      this.clients['local'] = localClient;
    }

    this.webserver = require('../../modules/web/Webserver');

    // set the first game mode
    this.currentGameMode = this.settings.GAME_MODES[0];

    this.gameStartTime = 1000;

    const instance = this;

    // when a client connected over the master data socket
    this.eventHandler.webSocketEvents.MASTER_CLIENT_CONNECTED.on(function(socketId) {
      instance._newClientConnected(socketId);
    },true);

    // when a client disconnected over the master data socket
    this.eventHandler.webSocketEvents.MASTER_CLIENT_DISCONNECTED.on(function(socketId) {
      instance._clientDisconnected(socketId);
    },true);

    // when a client send some data to the master
    this.eventHandler.webSocketEvents.SOCKET_MASTER_MESSAGE_RECEIVED.on(function(eventMsg) {
      if(eventMsg.msg.type === 'setUniqueId') {
        instance._setUniqueIdOnClient(eventMsg.socketId,eventMsg.msg.data)
      }
    },true);


    // when a local client wants the current state
    this.eventHandler.mainEvents.GET_STATE_DATA.on(function() {
      instance._changedGameSettings();
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
      avaibleGameModes: this.settings.GAME_MODES,
      avaibleTeams: this.settings.TEAMS,
      avaibleShotStrength: this.settings.SHOT_STRENGTH,
      maxPlayerId: this.settings.MAX_PLAYER_ID,
      currentGameMode: this.currentGameMode,
      gameStartTime: this.gameStartTime,
      clients: this.clients
    };
    // tell all clients that the state has ben updated
    this.webserver.sendMasterModeData('updateData',settings);

    // tell the local program that the state has changed
    this.eventHandler.mainEvents.STATE_DATA_UPDATE.emit(settings);
  }
}

exports.MasterState = MasterState;