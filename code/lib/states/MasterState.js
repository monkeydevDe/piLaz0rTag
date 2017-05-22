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
    this.log.info('MasterState: A new client connected with sockeId: '+socketId);
    this.clients[socketId] = new ClientSetupData(socketId);
  }

  /**
  * when a client disconnected
  */
  _clientDisconnected(socketId) {
    this.log.info('MasterState: A client disconnected with sockeId: '+socketId);
    this.clients[socketId] = null;
    delete this.clients[socketId];
  }

  /**
   * When settings of a client where changed like team strength etc
   */
  changedClientSettings() {

  }

  /**
   * When game settings like start time scoring points etc where changed
   */
  changedGameSettings() {
    const settings = {
      avaibleGameModes:this.settings.GAME_MODES,
      currentGameMode: this.currentGameMode
    };
    this.webserver.sendMasterModeData('settings',settings);
  }

}

exports.MasterState = MasterState;