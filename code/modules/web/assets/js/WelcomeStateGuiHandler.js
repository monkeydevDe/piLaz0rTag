class WelcomeStateGuiHandler {

  constructor() {
    
  }

  /**
   * Is called when some new state data arrived from the backend
   * @param data
   */
  handleStateDataUpdate(data) {
    $('#client_master_host').text(data);
  }
}