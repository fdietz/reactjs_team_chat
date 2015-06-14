import $ from "jquery";

import ServerActionsCreator from "../actions/ServerActionsCreator";

export default {

  fetchMessages: function() {
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
  },

  createMessage: function(message) {
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