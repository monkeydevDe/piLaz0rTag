const { BaseClass } = require('./../BaseClass');

class BaseState extends  BaseClass {

  constructor() {
    super();

    const os = require('os');
    this.uniqueId = os.hostname();
  }

}

exports.BaseState = BaseState;