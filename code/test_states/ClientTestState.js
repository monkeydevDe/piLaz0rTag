const { ClientState } = require('../lib/states/ClientState');

/**
 * For testing purpose connect to a master mode server
 */
class ClientTestState {
  constructor() {
    const os = require('os');
    const uniqueId = os.hostname()+'_test';
    this.clientState = new ClientState('localhost',uniqueId);
  }
}

const test = new ClientTestState();