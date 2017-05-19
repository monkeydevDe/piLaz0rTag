const { BaseClass } = require('./../BaseClass');

/**
 * Handles the Lobby Master State
 */
class MasterState extends BaseClass {
  constructor() {
    super();

    this.log.info("Mastermode: Starting master mode.");

    this.clients = {};
    this.webserver = require('../../modules/web/Webserver');
    // set the first mode
    this.currentGameMode = this.settings.GAME_MODES[0];
  }

  changeGameMode(newGameMode) {
    this.log.info("MasterMode: Change gameMode from: "+this.currentGameMode+" to: "+newGameMode);
    this.currentGameMode = newGameMode;
    this.changedGameSettings();
  }

  /**
   * When a new client connected to the master
   */
  newClientConnected() {

  }

  /**
  * when a client disconnected
  */
  clientDisconnected() {

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