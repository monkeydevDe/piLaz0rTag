/**
 * Gui Handler for the Master State where the user can make game settings
 */
class MasterStateGuiHandler {
  constructor() {
    $(document.body).on('change', '#master_gameMode', function () {
      alert($(this).val());
    });

  }

  /**
   * Is called when some new state data arrived from the backend
   * @param data
   */
  handleStateDataUpdate(data) {
    this._updateGameModeSelect(data);
    this._updateStartTime(data);
    this._updateClients(data);

  }

  /**
   * Updates the game mode selection
   * @param data
   * @private
   */
  _updateGameModeSelect(data) {
    $('#master_gameMode').html('');
    for (let gameModeIdx in data.avaibleGameModes) {
      const gameMode = data.avaibleGameModes[gameModeIdx];
      const selected = (data.currentGameMode === gameMode) ? 'selected' : '';
      $('#master_gameMode').append('<option ' + selected + ' value="' + gameMode + '">' + gameMode + '</option>');
    }
  }

  _updateStartTime(data) {
    $('#master_start_time').val(data.gameStartTime);
  }

  /**
   * Displays the clients
   * @param data
   * @private
   */
  _updateClients(data) {

    const instance = this;

    if ($.isEmptyObject(data.clients) === true) {
      $('#master_clients').html('No clients connected.');
      return;
    }

    $('#master_clients').html('');
    $.each(data.clients, function (idx, client) {
      $('#master_clients').append('<div class="panel panel-info">' +
        '<div class="panel-heading">' + client.uniqueId + '</div>' +
        '<div class="panel-body">' +
        instance._generateRow(instance._generatePlayerId(client, data), instance._generateTeamSelect(client, data)) +
        instance._generateRow(instance._generateHealth(client), instance._generateLives(client)) +
        instance._generateRow(instance._generateShotStrength(client, data), instance._generateMags(client), instance._generateRoundsPerMag(client)) +
        instance._generateRow(instance._generateShootDelay(client), instance._generateRespawnTime(client), instance._generateReloadTime(client)) +
        '</div>' +
        '</div>' +
        '</div>'
      )
      ;
    });
  }

  /**
   * Generates a div row with the given columns
   * @param colOne
   * @param colTwo
   * @param colThree
   * @returns {string}
   * @private
   */
  _generateRow(colOne, colTwo, colThree) {

    const mdClass = (colThree === undefined) ? 'col-md-6' : 'col-md-4';


    let htmlContent = '<div class="row">' +
      '<div class="' + mdClass + '">' + colOne + '</div>' +
      '<div class="' + mdClass + '">' + colTwo + '</div>';

    if (colThree !== undefined) {
      htmlContent += '<div class="' + mdClass + '">' + colThree + '</div>';
    }

    htmlContent += '</div>';

    return htmlContent;
  }

  /**
   * Generates the shot strength select for the client
   * @param client
   * @param data
   * @returns {string}
   * @private
   */
  _generateShotStrength(client, data) {
    let htmlContent = '<div class="form-group">' +
      '<label>Shot Strength:</label>' +
      '<select class="form-control">';
    $.each(data.avaibleShotStrength, function (idx, shotStrength) {
      const selected = (shotStrength === client.shotStrength) ? 'selected' : '';
      htmlContent += '<option ' + selected + ' value="' + shotStrength + '">' + shotStrength + '</option>';
    });
    htmlContent += '</select>' +
      '</div>';

    return htmlContent;
  }

  /**
   * Generates the player id select
   * @param client
   * @param data
   * @private
   */
  _generatePlayerId(client, data) {
    let htmlContent = '<div class="form-group">' +
      '<label>Player Id:</label>' +
      '<select class="form-control">';
    for (let playerId = 0; playerId < data.maxPlayerId; playerId++) {
      const selected = (playerId === client.playerId) ? 'selected' : '';
      htmlContent += '<option ' + selected + ' value="' + playerId + '">' + playerId + '</option>';
    }
    htmlContent += '</select>' +
      '</div>';

    return htmlContent;
  }

  /**
   * Generates the team select
   * @param client
   * @param data
   * @returns {string}
   * @private
   */
  _generateTeamSelect(client, data) {

    let htmlContent = '<div class="form-group">' +
      '<label>Team</label>' +
      '<select class="form-control">';

    $.each(data.avaibleTeams, function (idx, team) {
      const selected = (team === client.team) ? 'selected' : '';
      htmlContent += '<option ' + selected + ' vlaue="' + team + '">' + team + '</option>';
    });

    htmlContent += '</select>' +
      '</div>';

    return htmlContent;
  }

  /**
   * Generate the healt input
   * @param client
   * @returns {string}
   * @private
   */
  _generateHealth(client) {
    return this._generateNumberInput(client.health, 'Health:', 25, 500);
  }

  /**
   * Generates the input for live
   * @param client
   * @private
   */
  _generateLives(client) {
    return this._generateNumberInput(client.lives, 'Lives:', 1, 25);
  }

  /**
   * Generates the number of mags
   * @param client
   * @returns {string}
   * @private
   */
  _generateMags(client) {
    return this._generateNumberInput(client.mags, 'Mags:', 1, 25);
  }

  /**
   * generates the rounds per mag
   * @param client
   * @returns {string}
   * @private
   */
  _generateRoundsPerMag(client) {
    return this._generateNumberInput(client.roundsPerMag, 'Rounds per Mag:', 1, 150);
  }

  _generateReloadTime(client) {
    return this._generateNumberInput(client.reloadTime, 'Reload Time:', 1000, 10000);
  }

  _generateRespawnTime(client) {
    return this._generateNumberInput(client.respawnTime, 'Respwan Time:', 1000, 100000);
  }

  _generateShootDelay(client) {
    return this._generateNumberInput(client.respawnTime, 'Shoot Delay:', 50, 100000);
  }


  /**
   * Generates a number input
   * @param currVal
   * @param label
   * @param min
   * @param max
   * @returns {string}
   * @private
   */
  _generateNumberInput(currVal, label, min, max) {
    let htmlContent = '<div class="form-group">' +
      '<label>' + label + '</label>' +
      '<input class="form-control" type="number" value="' + currVal + '" min="' + min + '" max="' + max + '" />' +
      '</div>';

    return htmlContent;
  }
}