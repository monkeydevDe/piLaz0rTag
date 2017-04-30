/**
 * This is the description of a module
 */
class ModuleCfg {
  /**
   * Constuctor
   * @param className the name of the class to load
   * @param autoLoad when true it will be always loaded by the rigistry false it must be configured
   */
  constructor(className, autoLoad = false) {
    this.className = className;
    this.autoLoad = autoLoad;
  }
}

exports.ModuleCfg = ModuleCfg;