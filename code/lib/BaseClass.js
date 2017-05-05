/**
 * Almost every class should extend from this one.
 * It provides some necessary base fields like logger and event handler.
 */
class BaseClass {
  constructor() {
    this.log = require('./Logger');
    this.eventHandler = require('./LaserTagEventHandler');
    this.settings = require('./Settings');

    let instance = this;
    process.on('SIGINT', function () {
      instance._cleanUpInternal();
    });
  }

  /**
   * This is called when the process dies.
   * You can do some clean up here like unexporting pins etc.
   * @private
   */
  _cleanUpInternal() {
    // override in the extending class
  }
}

exports.BaseClass = BaseClass;