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

    this.bonjour = require('../../modules/bonjour/BonjourHandler');
    this.bonjour.publishMasterHost();

    // set the first game mode
    this.currentGameMode = this.settings.GAME_MODES[0];

    this.gameStartTime = 1000;

    const instance = this;

    // when a client connected over the master data socket
    this.addEvent(this.eventHandler.webSocketEvents.MASTER_CLIENT_CONNECTED.on(function(socketId) {
      instance._newClientConnected(socketId);
    },true));

    // when a client disconnected over the master data socket
    this.addEvent(this.eventHandler.webSocketEvents.MASTER_CLIENT_DISCONNECTED.on(function(socketId) {
      instance._clientDisconnected(socketId);
    },true));

    // when a client send some data to the master
    this.addEvent(this.eventHandler.webSocketEvents.SOCKET_MASTER_MESSAGE_RECEIVED.on(function(eventMsg) {
      if(eventMsg.msg.type === 'setUniqueId') {
        instance._setUniqueIdOnClient(eventMsg.socketId,eventMsg.msg.data)
      }
    },true));

    this.addEvent(this.eventHandler.mainEvents.UPDATE_STATE_DATA.on(function(masterData) {
      if(masterData.type === 'data') {
        instance._updateMasterData(masterData.value);
      }

      if(masterData.type === 'start_game') {
        instance._startGame();
      }
    },true));


    // when a local client wants the current state
    this.addEvent(this.eventHandler.mainEvents.GET_STATE_DATA.on(function() {
      instance._broadCastData();
    },true));
  }

  internalCleanup() {
    this.bonjour.unpublishAll();
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
    this._broadCastData();
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
    this._broadCastData();
  }

  /**
   * Updates the state data on master
   * @param masterData
   * @private
   */
  _updateMasterData(masterData) {
     this.log.info('MasterState: update data.');
     this.currentGameMode = masterData.currentGameMode;
     this.gameStartTime = masterData.gameStartTime;

     for(let clientIdx in masterData.clients) {
       const newClientState = masterData.clients[clientIdx];
       if(this.clients[clientIdx] !== undefined) {
         let client = this.clients[clientIdx];
         client.team = newClientState.team;
         client.playerId = Number(newClientState.playerId);
         client.health = newClientState.health;
         client.lives = newClientState.lives;
         client.shotStrength = Number(newClientState.shotStrength);
         client.mags = newClientState.mags;
         client.roundsPerMag = newClientState.roundsPerMag;
         client.shootDelay = newClientState.shootDelay;
         client.respawnTime = newClientState.respawnTime;
         client.reloadTime = newClientState.reloadTime;
       }
     }

     this._broadCastData();
  }


  /**
   * When game settings like start time scoring points etc where changed
   */
  _broadCastData() {
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
    this.eventHandler.mainEvents.STATE_DATA_UPDATED.emit(settings);
  }

  /**
   * Tells all the clients that a game is starting
   * @private
   */
  _startGame() {
    this.log.info('MasterState: Tell all clients to start a new game.');

    const settings = {
      currentGameMode: this.currentGameMode,
      gameStartTime: this.gameStartTime,
      clients: this.clients
    };

    // tell all clients to start
    this.webserver.sendMasterModeData('startGame',settings);

    // tell local client to start
    if(this.settings.MASTER_MODE_ADD_LOCAL_CLIENT === true) {
      const localSettings = {
        currentGameMode: this.currentGameMode,
        gameStartTime: this.gameStartTime,
        client: this.clients['local']
      };
      this.eventHandler.mainEvents.CHANGE_STATE.emit({state: 'GAME_STARTING', data: localSettings});
    }
  }
}

exports.MasterState = MasterState;