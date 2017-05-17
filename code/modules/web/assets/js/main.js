$(function() {

  new WebSocketHandler($);

  $(document.body).on( "click", "button.state-btn", function() {
    const newState =  $(this).data('state');
    wsHandlerInstance.sendNewState(newState);
  });

});

