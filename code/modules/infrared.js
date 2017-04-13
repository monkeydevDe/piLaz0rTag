
function infrared(log,settings,myEmitter) {
  if(settings.INFRARED === "lircd") {
    log.line("LIRCD infrared is configured.");
    const { LircdInfraredHandler } = require('./infrared/lircd.js');
    return new LircdInfraredHandler(log,myEmitter);
  }
}

module.exports = infrared;