/**
 * Handles the remote signals via lirc
 */

exports = module.exports = lircd;

function lircd (log) {
  log.line('Starting lircd');

  const lirc = require('lirc-client')({
    path: '/var/run/lirc/lircd'
  });

  lirc.on('connect', function () {
    lirc.cmd('VERSION', function (err, res) {
      console.log('LIRC Version', res);
    });
  });

  lirc.on('receive', function (remote, button, repeat) {
    console.log('button ' + button + ' on remote ' + remote + ' was pressed!');
  });
}