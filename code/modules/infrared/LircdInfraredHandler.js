/**
 * Handles the ir signals via lircd
 */
const { BaseInfraredHandler } = require('./BaseInfraredHandler.js');

class LircdInfraredHandler extends BaseInfraredHandler {

  constructor(log, eventHandler) {
    super(log, eventHandler);

    log.info('Connecting to lirc daemon');

    // when a callback is called this holds the current instance
    const instance = this;

    this.lirc = require('lirc-client')({
      path: '/var/run/lirc/lircd'
    });


    this.lirc.on('connect', function() {
      instance.lirc.cmd('VERSION', function(err, res) {
        log.info('Successfully connected to LIRCD (' + res + ').');
      });
    });


    this.lirc.on('receive', function(remote, button) {
      instance.log.debug('Got lircd message: '+button);
      instance.handleIncomingMsg(button);
    });
  }
}

exports.LircdInfraredHandler = LircdInfraredHandler;

