const EventEmitter = require('events');

/**
 * The event handler for the lasertag game.
 */
class LaserTagEventHandler extends EventEmitter {

  constructor(log) {

    super();

    this.log = log;
  }

  /**
   * This emits the event when a ir message was received
   * @param irMsg
   */
  emitIrReceivedMsg(irMsg) {
    this.emit('ir_received', irMsg);
  }
}

exports.LaserTagEventHandler = LaserTagEventHandler;