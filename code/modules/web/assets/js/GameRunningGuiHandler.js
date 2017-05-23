/**
 * Handles the gui when in game mode
 */
class GameRunningGuiHandler {
  constructor() {

    // when to rumble in the jungle
    /*wsHandlerInstance.on('rumble', function (data) {
      if (data.on == true) {
        window.navigator.vibrate(250);
      }
    });*/

    const instance = this;

    // bind click event to buttons to emit data over the websocket
    $(document.body).on('mousedown', '.gameRunSocketMsgBtn', function () {
      instance.sendButtonState(this, 'down');
    }).on('mouseup', function () {
      instance.sendButtonState(this, 'up');
    });

    /**
     * Creates and sends a fake_ir_receive message to the webserver
     */
    $(document.body).on('click','#dev_fake_ir_btn', function() {
      let playerId = $('#dev_fake_ir_player').val();
      let teamId = $('#dev_fake_ir_team').val();
      let strength = $('#dev_fake_ir_strength').val();
      let msg = 'shoot_' + playerId + '_' + teamId + '_' + strength;
      wsHandlerInstance.sendSocketMessage('fake_ir_receive', msg);
    });

  }

  /**
   * Sends the button state via websocket to the gun backend
   * @param btnObj
   * @param status
   */
  sendButtonState(btnObj, status) {
    let msgType = $(btnObj).data('messageType');
    wsHandlerInstance.sendSocketMessage(msgType, status);
  }

  /**
   * Is called when on the websocket data is received
   * @param data
   */
  handleStateDataUpdate(data) {

    // check if to enable disable certain buttons
    var respawning = data.status.respawning;
    var reloading = data.status.reloading;


    var disableButton = (respawning == true || reloading == true);
    var disableReload = (disableButton || data.status.mags == 0);

    $('#gamerun_reloadBtn').prop("disabled", disableReload);
    $('#gamerun_shootBtn').prop("disabled", disableButton);

    this._updateData('uniqueId', data);
    this._updateData('shootStrength', data);
    this._updateData('id', data);
    this._updateData('team', data);
    this._updateStatusData('respawning', data.status);

    this._updateData('health', data);
    this._updateStatusData('health', data.status);

    this._updateData('mags', data);
    this._updateStatusData('mags', data.status);

    this._updateData('roundsPerMag', data);
    this._updateStatusData('roundsInMag', data.status);

    this._updateData('lives', data);
    this._updateStatusData('lives', data.status);


  }

  _updateStatusData(fieldName, statusData) {
    this._updateData(fieldName, statusData, 'status');
  }

  _updateData(fieldName, data, prefix) {
    let htmlId = (prefix == undefined) ? fieldName : prefix + '_' + fieldName;
    $('#gamerun_' + htmlId).html(data[fieldName]);
  }
}

