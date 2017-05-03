/**
 * NEEDED DEV ONLY
 * When this is configured as Ir Handler the user can send ir message via websocket.
 * This is for dev testing without having the actual hardware wired.
 * Open http://<ip of pi>/fake in your browser
 */

const { BaseInfraredHandler } = require('./BaseInfraredHandler');

class FakeWebsocketIrHandler extends BaseInfraredHandler {
  constructor() {

    super();

    this.log.info('Infrared: Using Websockt infrared handler');

    let instance = this;

    this.eventHandler.webSocketEvents.SOCKET_MESSAGE_RECEIVED.on(function(socketMsg) {
      if(socketMsg.type === 'fake_ir_receive') {
        instance.handleIncomingMsg(socketMsg.value);
      }
    });
  }

  sendShootMsg(playerId, teamColor, strength) {
    this.log.info('FakeWebSocketIr: send shoot signal: ' + playerId + '_' + teamColor + '_' + strength);
  }
}

module.exports = new FakeWebsocketIrHandler();