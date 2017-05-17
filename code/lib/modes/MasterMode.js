const { BaseClass } = require('./../BaseClass');

/**
 * Handles the Lobby Master Mode
 */
class MasterMode extends BaseClass {
  constructor() {
    super();
    this.clients = {};
    // set the first mode
    this.currentGameMode = this.settings.GAME_MODES[0];
  }

  changeGameMode(newGameMode) {
    this.log.info("MasterMode: Change gameMode from: "+this.currentGameMode+" to: "+newGameMode);
    this.currentGameMode = newGameMode;
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

  }

}