/**
 * Gui Handler for the Client State
 */
class ClientStateGuiHandler {

  /**
   * Is called when some new state data arrived from the backend
   * @param data
   */
  handleStateDataUpdate(data) {

    $('#client_gameMode').text(data.currentGameMode);
    $('#client_start_time').text(data.gameStartTime);
    this._updateClients(data);
  }


  /**
   * Displays the clients
   * @param data
   * @private
   */
  _updateClients(data) {

    const instance = this;

    if($.isEmptyObject(data.clients) === true) {
      $('#master_clients').text('No clients connected.');
      return;
    }

    $('#client_clients').html('');

    $.each(data.clients, function(idx, client) {
      $('#client_clients').append('<div class="panel panel-info">' +
        '<div class="panel-heading">' + client.uniqueId + '</div>' +
        '<div class="panel-body">' +
        instance._generateRow(instance._generatePlayerId(client), instance._generateTeamSelect(client)) +
        instance._generateRow(instance._generateHealth(client), instance._generateLives(client)) +
        instance._generateRow(instance._generateShotStrength(client), instance._generateMags(client), instance._generateRoundsPerMag(client)) +
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

    const mdClass = (colThree === undefined) ? 'col-xs-6' : 'col-xs-4';

    let htmlContent = '<div class="row">' +
      '<div class="' + mdClass + '">' + colOne + '</div>' +
      '<div class="' + mdClass + '">' + colTwo + '</div>';

    if(colThree !== undefined) {
      htmlContent += '<div class="' + mdClass + '">' + colThree + '</div>';
    }

    htmlContent += '</div>';

    return htmlContent;
  }

  /**
   * Generates the shot strength select for the client
   * @param client
   * @returns {string}
   * @private
   */
  _generateShotStrength(client) {
    return this._displayClientField(client, 'shotStrength', 'Shot Strength:');
  }

  /**
   * Generates the player id select
   * @param client
   * @private
   */
  _generatePlayerId(client) {
    return this._displayClientField(client, 'playerId', 'Player Id:');
  }

  /**
   * Generates the team select
   * @param client
   * @returns {string}
   * @private
   */
  _generateTeamSelect(client) {
    return this._displayClientField(client, 'team', 'Team:');
  }

  /**
   * Generate the healt input
   * @param client
   * @returns {string}
   * @private
   */
  _generateHealth(client) {
    return this._displayClientField(client, 'health', 'Health:');
  }

  /**
   * Generates the input for live
   * @param client
   * @private
   */
  _generateLives(client) {
    return this._displayClientField(client, 'lives', 'Lives:');
  }

  /**
   * Generates the number of mags
   * @param client
   * @returns {string}
   * @private
   */
  _generateMags(client) {
    return this._displayClientField(client, 'mags', 'Mags:');
  }

  /**
   * generates the rounds per mag
   * @param client
   * @returns {string}
   * @private
   */
  _generateRoundsPerMag(client) {
    return this._displayClientField(client, 'roundsPerMag', 'Rounds per Mag:');
  }

  _generateReloadTime(client) {
    return this._displayClientField(client, 'reloadTime', 'Reload Time:');
  }

  _generateRespawnTime(client) {
    return this._displayClientField(client, 'respawnTime', 'Respwan Time:');
  }

  _generateShootDelay(client) {
    return this._displayClientField(client, 'shootDelay', 'Shoot Delay:');
  }


  /**
   * Generates a number input
   * @param field
   * @param label
   * @returns {string}
   * @private
   */
  _displayClientField(client, field, label) {
    const htmlContent = '<div class="form-group">' +
      '<label>' + label + '</label>' +
      '<span>' + client[field] + '</span>' +
      '</div>';

    return htmlContent;
  }
}