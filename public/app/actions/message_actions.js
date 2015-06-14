import appDispatcher from '../dispatchers/app_dispatcher';
import MessageConstants from '../constants/message_constants';
import WebAPI from '../lib/WebAPI';

class MessageActions {

  constructor(appDispatcher) {
    this.appDispatcher = appDispatcher;
  }

  create(message) {
    // dispatch event for consistency reasons, but
    // is not used currently
    this.appDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      message: message
    });

    WebAPI.createMessage(message);
  }

  add(message) {
    this.appDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_ADD,
      message: message
    });
  }

  fetch() {
    // dispatch event for consistency reasons, but
    // is not used currently
    this.appDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_FETCH
    });

    WebAPI.fetchMessages();
  }
}

let messageActions = new MessageActions(appDispatcher);
export default messageActions;
