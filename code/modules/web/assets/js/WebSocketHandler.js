let wsHandlerInstance = null;


class WebSocketHandler {

  constructor($) {

    // handler for the current state
    this.currentStateHandler = null;

    if(!wsHandlerInstance){
      wsHandlerInstance = this;
    }

    this.$ = $;
    this.socket = io();


    this.socket.on( 'disconnect', function () {
      $.blockUI({message: '<h1><span class="glyphicon glyphicon-refresh"></span> Connection lost. Wait until reconnect</h1>'});
    });

    this.socket.on( 'connect', function () {
      $.unblockUI();
    });

    this.socket.on('display', function(msg) {

      // check what to do with the message
      if(msg.type === 'state_changed') {
        wsHandlerInstance._loadStateContent(msg.data);
      }

      // when the backend wants the current state to be updated
      if(msg.type === 'state_status') {
        if(wsHandlerInstance.currentStateHandler !== null) {
          wsHandlerInstance.currentStateHandler.handleStateDataUpdate(msg.data);
        }
      }
      
    });
    
  }

  /**
   * Handles to send a new state over the socket
   * @param state
   */
  sendNewState(state,data) {
    const dataToSend = {
      state: state,
      data: data
    }
    wsHandlerInstance.sendSocketMessage('change_state',dataToSend);
  }

  /**
   * Sends a socketMessage to the backend
   * @param type the type of the message
   * @param value the value of the message
   */
  sendSocketMessage(type, value) {
    wsHandlerInstance.socket.emit('socketMessage', {type: type, value: value});
  }

  /**
   * Loads the main state template and displays it in the mainContentWrapper
   * http://stackoverflow.com/questions/17073648/load-knockout-template-from-external-file-without-complex-engine
   * @param state
   * @private
   */
  _loadStateContent(state) {
    wsHandlerInstance.$('#mainContentWrapper').html('');
    wsHandlerInstance.currentStateHandler = null;
    delete wsHandlerInstance.currentStateHandler;

    let templateName = '';

    if(state === 'SELECT_MODE') {
      templateName = 'Welcome';
    }

    if(state === 'MASTER_MODE') {
      templateName = 'Master';
      wsHandlerInstance.currentStateHandler = new MasterStateGuiHandler();
    }

    // when a template was loaded display it
    if(templateName !== '') {
      wsHandlerInstance.$.ajax('templates/'+templateName+'.html', { async: false })
        .done(function (stream) {
          wsHandlerInstance.$('#mainContentWrapper').html(stream);
          // get the current state data
          wsHandlerInstance.sendSocketMessage('get_current_state_data',{});
        });
    }
  }
}
