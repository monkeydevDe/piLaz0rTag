class BaseInfraredHandler {

  constructor(log, eventHandler) {
    this.log = log;
    this.eventHandler = eventHandler;

    eventHandler.on('ir_shoot', (playerId,teamColor,strength) => {
      console.log('Received ir code '+ir_code);
    });
  }

  handleIncomingMsg(ir_msg) {
    this.eventHandler.emit('ir_received',ir_msg);
  }

  sendShootMsg(playerId,teamColor,strength) {
    console.error("Implement me");
  }
}

exports.BaseInfraredHandler = BaseInfraredHandler;