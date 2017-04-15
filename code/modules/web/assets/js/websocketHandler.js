
$(function() {

  var PlayerViewModel = {
    rounds : ko.observable(0),
    mags: ko.observable(0),
    health: ko.observable(0)
  };
  ko.applyBindings(PlayerViewModel);


  var socket = io();

  $('.socketMsg').on('click', function() {

    var msgType = $(this).data('messageType');
    var msgVal = $(this).data('messageValue');
    socket.emit('socketMessage', {"type" : msgType, "value" : msgVal});
  });

  // register event to update display
  socket.on('display', function(data) {
    console.error(data);
    PlayerViewModel.rounds(data.status.roundsInMag);
    PlayerViewModel.mags(data.status.mags);
    PlayerViewModel.health(data.status.health);
  });
});