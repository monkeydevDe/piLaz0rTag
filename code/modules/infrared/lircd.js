/**
 * Handles the remote signals via lirc
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
 */
/*exports = module.exports = lircd;

function lircd(log,myEmitter) {

  log.line('Starting lircd');

  const lirc = require('lirc-client')({
    path: '/var/run/lirc/lircd'
  });

  lirc.on('connect', function() {

    lirc.cmd('VERSION', function(err, res) {
      log.line('Successfully connected to LIRCD (' + res + ').');
    });
  });

  lirc.on('receive', function(remote, button) {
    log.line('Got lirc message: '+button);
    myEmitter.emit('ir_received',button);
  });
} */


class InfraredHandler {

  constructor(log, eventHandler) {
    this.log = log;
    this.eventHandler = eventHandler;
  }

  handleIncomingMsg(ir_msg) {
    console.error("Implement me");
  }

  sendShootMsg(playerId,teamColor,strength) {
    console.error("Implement me");
  }

}

class LircdInfraredHandler extends InfraredHandler {

  constructor(log, eventHandler) {
    super(log, eventHandler);

    log.line('Connecting to lirc daemon');

    this.lirc = require('lirc-client')({
      path: '/var/run/lirc/lircd'
    });

    this.lirc.on('connect', function() {

      this.lirc.cmd('VERSION', function(err, res) {
        log.line('Successfully connected to LIRCD (' + res + ').');
      });
    });
  }
}

exports.LircdInfraredHandler = LircdInfraredHandler;

