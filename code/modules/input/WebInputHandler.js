/**
 * Input over a websocket.
 * This listens on the event that a websocket msg was received.
 * When the message fits an input type it will do the command.
 *
 */
const { BaseInputHandler } = require('./BaseInputHandler');

class WebInputHandler extends BaseInputHandler {
  constructor() {

    super();

    let instance = this;

    this.eventHandler.webSocketEvents.SOCKET_MESSAGE_RECEIVED.on(function(msg) {

      if(msg.type === 'shoot') {
        instance.triggerShot(msg.value);
      }

      if(msg.type === 'reload') {
        instance.triggerReload();
      }
    });
  }
}

module.exports = new WebInputHandler();