/**
 * Almost every class should extend from this one.
 * It provides some necessary base fields like logger and event handler.
 */
class BaseClass {
  constructor() {
    this.log = require('./Logger');
    this.eventHandler = require('./LaserTagEventHandler');
  }
}

exports.BaseClass = BaseClass;