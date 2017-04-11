exports = module.exports = input;

function input(log,settings) {

  if(settings.INPUT === "keyboard") {
    log.line("Keyboard input is configured.");
    var keyboardInput = require('./input/keyboard')
    return keyboardInput(log,settings)
  }

}