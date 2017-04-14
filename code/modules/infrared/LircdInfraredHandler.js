/**
 * Handles the ir signals via lircd
 */
const { BaseInfraredHandler } = require('./BaseInfraredHandler.js');

class LircdInfraredHandler extends BaseInfraredHandler {

  constructor() {
    super();

    this.log.info('Connecting to lirc daemon');

    this.eventHandler = require('../../lib/LaserTagEventHandler');

    // when a callback is called this holds the current instance
    const instance = this;

    this.lirc = require('lirc-client')({
      path: '/var/run/lirc/lircd'
    });


    this.lirc.on('connect', function() {
      instance.lirc.cmd('VERSION', function(err, res) {
        instance.log.info('Successfully connected to LIRCD (' + res + ').');
      });
    });


    this.lirc.on('receive', function(remote, button) {
      instance.log.debug('Got lircd message: '+button);
      instance.handleIncomingMsg(button);
    });

    this.eventHandler.on('game_shoot',function() {
       instance.log.info('Shhhooooooting');
    });
  }
}

exports.LircdInfraredHandler = LircdInfraredHandler;

