$(function() {

  new WebSocketGuiHandler($);

  $(document.body).on( "click", "button.state-btn", function() {
    const newState =  $(this).data('state');
    wsHandlerInstance.sendNewState(newState,{});
  });

  /**
   * User wants to access the master
   */
  $(document.body).on( "click", "#client_switch_mode", function() {

    const masterHost = $('#client_master_host').val().trim();
    if(masterHost === '') {
      alert('No Master Host set');
      return;
    }

    wsHandlerInstance.sendNewState('CLIENT_MODE',{host: masterHost});

  });


});

