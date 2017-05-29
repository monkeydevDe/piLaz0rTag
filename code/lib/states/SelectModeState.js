const {BaseState} = require('./BaseState');

/**
 * Handles the state when being in select state.
 */
class SelectModeState extends BaseState {

  /**
   * Constructor
   *
   */
  constructor() {
    super();

    this.masterHost = null;

    const instance = this;

    // when a local client wants the current state
    this.addEvent(this.eventHandler.mainEvents.GET_STATE_DATA.on(function() {
      instance._broadCastData();
    },true));

    this.addEvent(this.eventHandler.mainEvents.UPDATE_STATE_DATA.on(function(data) {
      if(data.type === 'bonjour') {
        instance.masterHost = data.value;
        instance._broadCastData();
      }
    },true));

  }

  _broadCastData() {
    this.eventHandler.mainEvents.STATE_DATA_UPDATED.emit(this.masterHost);
  }
}

exports.SelectModeState = SelectModeState;