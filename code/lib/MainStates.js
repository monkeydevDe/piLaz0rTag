class MainStates {

  constructor() {
    // select mode
    this.SELECT_MODE = 'SELECT_MODE';
    // master_mode to open a lobby
    this.MASTER_MODE = 'MASTER_MODE';
    // client mode 
    this.CLIENT_MODE = 'CLIENT_MODE';
    // when the game is starting and the countdown is running
    this.GAME_STARTING = 'GAME_STARTING';
    // when the countdown stopped and the game is running
    this.GAME_RUNNING = 'GAME_RUNNING';
  }
}

module.exports  = new MainStates();