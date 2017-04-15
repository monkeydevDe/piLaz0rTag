/**
 * Input over a websocket.
 * This listens on the event that a websocket msg was received.
 * When the message fits an input type it will do the command.
 *
 */

// import the type to this js
const {BaseInput} = require('./BaseInptut');

class WebInput extends BaseInput {
  constructor() {

    super();

    const instance = this;

    this.eventHandler.onWebsocketMsg(function(msg) {

      if(msg.type === 'shoot') {
        instance.triggerShoot();
      }

      if(msg.type === 'reload') {
        instance.triggerReload();
      }
    });
  }
}

exports.WebInput = WebInput;