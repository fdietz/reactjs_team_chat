import $ from "jquery";

import ServerActionsCreator from "../actions/ServerActionsCreator";

class WebAPI {

  fetchMessages() {
    $.ajax({
      type: "GET",
      url: "/messages",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        ServerActionsCreator.receiveMessages(data);
      },
      error: function(error) { alert(error); }
    });
  }

  createMessage(message) {
    $.ajax({
      type: "POST",
      url: "/messages",
      data: JSON.stringify(message),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        ServerActionsCreator.receiveCreatedMessage(data);
      },
      error: function(data) {
        ServerActionsCreator.receiveCreatedMessage(data.responseJSON);
      }
    });
  }

}

let webAPI = new WebAPI();

export default webAPI;