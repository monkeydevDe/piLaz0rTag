class MainStates {

  constructor() {
    // setup the game
    this.SETUP = 'SETUP';
    // when the game is starting and the countdown is running
    this.GAME_STARTING = 'GAME_STARTING';
    // when the countdown stoped and the game is running
    this.GAME_RUNNING = 'GAME_RUNNING';
  }
}

module.exports  = new MainStates();