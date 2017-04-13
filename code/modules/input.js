exports = module.exports = input;

function input(log,settings) {

  if(settings.INPUT === "keyboard") {
    log.info("Keyboard input is configured.");
    var keyboardInput = require('./input/keyboard')
    return keyboardInput(log,settings)
  }

}