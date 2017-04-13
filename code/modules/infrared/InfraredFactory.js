/**
 * A Factory which reads the configured infrared handler and returns the needed instance.
 */
class InfraredFactory {

  constructor(log,settings,myEmitter) {

    if(settings.INFRARED === "lircd") {
      log.line("LIRCD infrared is configured.");
      const { LircdInfraredHandler } = require('./LircdInfraredHandler.js');
      return new LircdInfraredHandler(log,myEmitter);
    }

    throw new Error('No infrared handle configured!');

  }
}

exports.InfraredFactory = InfraredFactory;