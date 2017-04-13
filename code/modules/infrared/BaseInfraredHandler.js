/**
 * This handles the infrared sending and receiving.
 * The concrete implementation must extend from this.
 */
class BaseInfraredHandler {

  constructor(log, eventHandler) {
    this.log = log;
    this.eventHandler = eventHandler;
  }

  handleIncomingMsg(irMsg) {
    this.eventHandler.emitIrReceivedMsg(irMsg);
  }

  sendShootMsg(playerId,teamColor,strength) {
    console.error("Implement me");
  }
}

exports.BaseInfraredHandler = BaseInfraredHandler;