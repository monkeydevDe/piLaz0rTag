
$(function() {

  var PlayerViewModel = {
    rounds : ko.observable(0),
    roundsPerMag: ko.observable(0),
    magsAvaible: ko.observable(0),
    nrOfMags: ko.observable(0),
    health: ko.observable(0),
    totalHealth: ko.observable(0)
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

    var enableReloadBtn = data.status.reloading;
    $('#reloadBtn').prop("disabled", enableReloadBtn);
    $('#shootBtn').prop("disabled", enableReloadBtn);


    PlayerViewModel.rounds(data.status.roundsInMag);
    PlayerViewModel.roundsPerMag(data.roundsPerMag);
    PlayerViewModel.magsAvaible(data.status.mags);
    PlayerViewModel.nrOfMags(data.mags);
    PlayerViewModel.health(data.status.health);
    PlayerViewModel.totalHealth(data.health);
  });
});