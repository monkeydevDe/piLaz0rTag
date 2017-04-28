/**
 * Handles the ir signals via lircd
 */
const { BaseInfraredHandler } = require('./BaseInfraredHandler');

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
    let irData = 'shoot_'+playerId+'_'+teamColor+'_'+strength;
    this.log.info('Sending ir data: '+irData);
    this.lirc.cmd('SEND_ONCE', 'pilazortag', irData, function(err) {
      if(err) {
        instance.log.error('An error happened while sending ir data: ' + err);
      }
    });
  }
}

module.exports = new LircdInfraredHandler();

