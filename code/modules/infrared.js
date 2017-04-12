exports = module.exports = infrared;

function infrared(log,settings) {
  if(settings.INFRARED === "lircd") {
    log.line("LIRCD infrared is configured.");
    const lircd = require('./infrared/lircd.js');
    return lircd(log)
  }
}