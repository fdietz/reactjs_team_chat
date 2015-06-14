import AppDispatcher from '../dispatchers/AppDispatcher';
import MessageConstants from '../constants/MessageConstants';
import WebAPI from '../lib/WebAPI';

export default {

  create: function(message) {
    // dispatch event for consistency reasons, but
    // is not used currently
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      message: message
    });

    WebAPI.createMessage(message);
  },

  add: function(message) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_ADD,
      message: message
    });
  },

  fetch: function() {
    // dispatch event for consistency reasons, but
    // is not used currently
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_FETCH
    });

    WebAPI.fetchMessages();
  }
}