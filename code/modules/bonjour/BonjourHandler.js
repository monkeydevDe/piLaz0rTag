const { BaseClass } = require('../../lib/BaseClass');

class BonjourHandler extends BaseClass {
  constructor(){
    super();
    this.bonjour = require('bonjour')();

    const os = require('os');
    this.masterServiceName = 'pilazorTag_master_'+os.hostname();

    this.mastetService = null;

    const instance = this;

    this.browser = this.bonjour.find({type: 'piLaz0rTag'},function(service) {
      console.error(service);
      const value = service.addresses[0];
      instance.log.info('Bonjour: Got service for master: '+value);
      instance.eventHandler.mainEvents.UPDATE_STATE_DATA.emit({type: 'bonjour',value: value});
    });


  }

  /**
   * Cast the master Host when in master mode
   */
  publishMasterHost() {
    this.log.info('Bonjour: Casting Master mode server on port: '+this.settings.WEBSERVER_PORT+' name: '+this.masterServiceName);
    this.mastetService  = this.bonjour.publish({ name: this.masterServiceName, type: 'piLaz0rTag', port: this.settings.WEBSERVER_PORT })
  }


  /**
   * Unpublish all services
   */
  unpublishAll() {
    this.bonjour.unpublishAll();
    this.mastetService = null;
    delete this.mastetService;
  }



}

module.exports = new BonjourHandler();