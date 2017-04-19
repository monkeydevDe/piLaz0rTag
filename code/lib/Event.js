/**
 * This class is for creating an event in the {{@LaserTagEventHandler}}
 */
class Event {

  constructor(name, mainEventHandler) {

    this.log = require('./Logger');
    this.log.debug('Event: Register event: '+name);

    this.name = name;
    this.mainEventHandler = mainEventHandler;
  }

  /**
   * Registers a handler function to this event
   * @param callback the function handling this event.
   */
  on(callback) {
    this.mainEventHandler.on(this.name, function(payload) {
      callback(payload);
    });
  }


  /**
   * Emits the event on the eventHandler
   * @param payload the payload to send with the event
   */
  emit(payload) {
    this.log.debug('Event: emit: ' + this.name + ' payload: ' + payload);
    this.mainEventHandler.emit(this.name, payload);
  }
}

exports.Event = Event;