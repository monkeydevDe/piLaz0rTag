const EventEmitter = require('events');


class LaserTagEventHandler extends EventEmitter {

  constructor() {
    super();

    // register here the events we need 
    this.on('ir_received', (ir_code) => {
      console.log('Received ir code '+ir_code);
    });

  }
}



exports.LaserTagEventHandler = LaserTagEventHandler;