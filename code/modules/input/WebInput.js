/**
 * Input over a websocket
 *
 */
class WebInput {
  constructor() {

    this.webserver = require('../web/Webserver');

    this.log = require('../../lib/Logger');



  }
}

exports.WebInput = WebInput;