const {BaseClass} = require('./../BaseClass');

class BaseState extends BaseClass {

  constructor() {
    super();
    const os = require('os');
    this.uniqueId = os.hostname();
    this.eventsToClean = [];
  }


  /**
   * Call this when registering an event so it can be removed when the state is stopped.
   * @param event
   */
  addEvent(event) {
    this.eventsToClean.push(event);
  }

  /**
   * Cleans up all events so the state can vanish :)
   */
  cleanUpEvents() {
    for (let idx in this.eventsToClean) {
      this.eventsToClean[idx].removeCleanupListeners();
    }
  }
}
exports.BaseState = BaseState;