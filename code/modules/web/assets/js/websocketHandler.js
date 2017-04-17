
$(function() {

  var PlayerViewModel = {
    rounds : ko.observable(0),
    roundsPerMag: ko.observable(0),
    magsAvaible: ko.observable(0),
    nrOfMags: ko.observable(0),
    health: ko.observable(0),
    totalHealth: ko.observable(0),
    playerId: ko.observable(0),
    team: ko.observable(''),
    shootStrength: ko.observable(0),
    lives: ko.observable(0),
    totalLives: ko.observable(0),
    respawning: ko.observable(false)
  };
  ko.applyBindings(PlayerViewModel);


  var socket = io();

  // bind click event to buttons to emit data over the websocket
  $('.socketMsg').on('click', function() {
    var msgType = $(this).data('messageType');
    var msgVal = $(this).data('messageValue');
    socket.emit('socketMessage', {"type" : msgType, "value" : msgVal});
  });


  $('#setup_btn_start').on('click',function() {
    startGame(socket);
  });

  // register event to update display
  socket.on('display', function(msg) {

    if(msg.type === 'game_status') {
      handleGameDisplayStatus(msg.data);
      return;
    }

    if(msg.type === 'state_changed') {

      $('.mainDisplay').hide();

      if(msg.data === 'GAME_RUNNING') {
        $('#gameStatusDisplay').show();
      }



      if(msg.data === 'SETUP') {
        $('#gameSetupDisplay').show();
      }

      if(msg.data === 'GAME_STARTING') {
        $('#gameStartingDisplay').show();
      }
      
      return;
    }
    

  });

  function startGame(socket) {
    let gameData = {
      'mode' : $('#setup_gameMode').val(),
      'gameStartTime' : $('#setup_gameStartTime').val(),
      'player' : {
        'id' : $('#setup_playerId').val(),
        'team' : $('#setup_teamSelect').val(),
        'shootStrength' : $('#setup_shootStrengthSelect').val(),
        'health' : $('#setup_playerHealth').val(),
        'lives' : $('#setup_playerLives').val(),
        'mags' : $('#setup_playerMags').val(),
        'roundsPerMag' : $('#setup_playerRoundsPerMag').val(),
        'respawnTime' : $('#setup_playerRespawnTime').val(),
        'reloadTime' : $('#setup_playerReloadTime').val(),
        'shootDelay' : $('#setup_playerShootDelay').val()
      }
    }

    socket.emit('socketMessage', {"type" : 'start_game', "value" : gameData});
  }

  /**
   * Handles the data when the game state changed
   * @param data
   */
  function handleGameDisplayStatus(data) {
    // check if to enable disable certain buttons
    var respawning = data.status.respawning;
    var reloading = data.status.reloading;


    var disableButton = (respawning == true || reloading == true);
    var disableReload = (disableButton || data.status.mags == 0);

    $('#reloadBtn').prop("disabled", disableReload);
    $('#shootBtn').prop("disabled", disableButton);


    PlayerViewModel.playerId(data.id);
    PlayerViewModel.shootStrength(data.shootStrength);
    PlayerViewModel.team(data.team);
    PlayerViewModel.rounds(data.status.roundsInMag);
    PlayerViewModel.roundsPerMag(data.roundsPerMag);
    PlayerViewModel.magsAvaible(data.status.mags);
    PlayerViewModel.nrOfMags(data.mags);
    PlayerViewModel.health(data.status.health);
    PlayerViewModel.totalHealth(data.health);
    PlayerViewModel.lives(data.status.lives);
    PlayerViewModel.totalLives(data.lives);
    PlayerViewModel.respawning(data.status.respawning);
  }
});