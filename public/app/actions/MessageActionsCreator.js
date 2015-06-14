import AppDispatcher from '../dispatchers/AppDispatcher';
import MessageConstants from '../constants/MessageConstants';
import WebAPI from '../lib/WebAPI';

class MessageActionsCreator {

  constructor(AppDispatcher) {
    this.AppDispatcher = AppDispatcher;
  }

  create(message) {
    // dispatch event for consistency reasons, but
    // is not used currently
    this.AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      message: message
    });

    WebAPI.createMessage(message);
  }

  add(message) {
    this.AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_ADD,
      message: message
    });
  }

  fetch() {
    // dispatch event for consistency reasons, but
    // is not used currently
    this.AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_FETCH
    });

    WebAPI.fetchMessages();
  }
}

let messageActionsCreator = new MessageActionsCreator(AppDispatcher);
export default messageActionsCreator;
