import AppDispatcher from '../dispatchers/AppDispatcher';
import ServerConstants from '../constants/ServerConstants';

export default {

  receiveMessages: function(messages) {
    AppDispatcher.dispatch({
      actionType: ServerConstants.RECEIVE_MESSAGES,
      messages: messages
    });
  },

  receiveCreatedMessage: function(data) {
    AppDispatcher.dispatch({
      actionType: ServerConstants.RECEIVE_CREATED_MESSAGE,
      data: data
    });
  }

}
