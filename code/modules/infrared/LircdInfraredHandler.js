/**
 * Handles the ir signals via lircd
 */
const {BaseInfraredHandler} = require('./BaseInfraredHandler.js');

class LircdInfraredHandler extends BaseInfraredHandler {

  constructor() {
    super();

    this.log.info('Connecting to lirc daemon');

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
      instance.log.debug('Got lircd message: ' + button);
      instance.handleIncomingMsg(button);
    });
  }

  sendShootMsg(playerId, teamColor, strength) {
    const instance = this;
    this.log.info('Sending ir data: shoot_31_green_50');
    this.lirc.cmd('SEND_ONCE', 'pilazortag', 'shoot_31_green_50', function(err) {
      instance.log.error('An error happened while sending ir data: '+err);
    });
  }
}

exports.LircdInfraredHandler = LircdInfraredHandler;

