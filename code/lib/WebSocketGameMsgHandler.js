const { BaseClass } = require('./BaseClass');

class WebSocketGameMsgHandler extends BaseClass {
  constructor() {
    super();

    const instance = this;

    // when something comes over the websocket decide if to handle it :)
    this.eventHandler.webSocketEvents.SOCKET_MESSAGE_RECEIVED.on(function(msg) {
      if(msg.type === 'start_game') {
        instance.eventHandler.mainEvents.GAME_SETUP.emit(msg.value);
      }

      if(msg.type === 'stop_game' && msg.value === 'down') {
        instance.eventHandler.mainEvents.GAME_STOP.emit();
      }

      // the state of the application has to change
      if(msg.type === 'change_state') {
        instance.eventHandler.mainEvents.CHANGE_STATE.emit(msg.value);
      }

      // the frontend wants the current state
      if(msg.type === 'get_current_state_data') {
        instance.eventHandler.mainEvents.GET_STATE_DATA.emit();
      }
    });
  }
}

module.exports = new WebSocketGameMsgHandler();