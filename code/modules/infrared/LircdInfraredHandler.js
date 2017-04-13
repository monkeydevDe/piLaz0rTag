/**
 * Handles the ir signals via lircd
 */
const { BaseInfraredHandler } = require('./BaseInfraredHandler.js');

class LircdInfraredHandler extends BaseInfraredHandler {

  constructor(log, eventHandler) {
    super(log, eventHandler);

    log.line('Connecting to lirc daemon');

    this.lirc = require('lirc-client')({
      path: '/var/run/lirc/lircd'
    });

    /*this.lirc.on('connect', function() {

      this.instance.lirc.cmd('VERSION', function(err, res) {
        log.line('Successfully connected to LIRCD (' + res + ').');
      });
    });*/

    var bla = this;

    this.lirc.on('receive', function(remote, button) {
      /*log.line('Got lirc message: '+button);
      eventHandler.emit('ir_received',button);*/
      bla.handleIncomingMsg(button);
    });
  }
}

exports.LircdInfraredHandler = LircdInfraredHandler;

