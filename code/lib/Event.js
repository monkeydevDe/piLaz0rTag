/**
 * This class is for creating an event in the {{@LaserTagEventHandler}}
 */
class Event {

  constructor(name, mainEventHandler) {

    this.cleanUpFunctions = Array();

    this.log = require('./Logger');
    this.name = name;
    this.mainEventHandler = mainEventHandler;

    if(this.mainEventHandler.settings.DEBUG_EVENTS === true) {
      this.log.debug('Event: Register event: ' + name);
    }
  }

  /**
   * Registers a handler function to this event
   * @param callback the function handling this event.
   * @param cleanUpFunction when true this listener is added to the clean up array.
   */
  on(callback, cleanUpFunction = false) {
    let onCall = function(payload) {
      callback(payload);
    };

    if(cleanUpFunction === true) {
      this.cleanUpFunctions.push(onCall);
    }

    this.mainEventHandler.on(this.name, onCall);

    return this;
  }

  /**
   * Removes all event listeners which are marked to be removed when this is called.
   * Mainly we have to do this with listeners which are removed and constructed during the game.
   * Basegame for example
   */
  removeCleanupListeners() {
    for(let idx in this.cleanUpFunctions) {
      this.mainEventHandler.removeListener(this.name, this.cleanUpFunctions[idx]);
    }
  }


  /**
   * Emits the event on the eventHandler
   * @param payload the payload to send with the event
   */
  emit(payload) {
    if(this.mainEventHandler.settings.DEBUG_EVENTS === true) {
      this.log.debug('Event: emit: ' + this.name + ' payload: ' + payload);
    }
    this.mainEventHandler.emit(this.name, payload);
  }
}

exports.Event = Event;