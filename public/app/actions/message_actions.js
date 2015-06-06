import appDispatcher from '../dispatchers/app_dispatcher';
import MessageConstants from '../constants/message_constants';

class MessageActions {

  constructor(appDispatcher) {
    this.appDispatcher = appDispatcher;
  }

  create(message) {
    this.appDispatcher.dispatch({
      actionType: MessageConstants.CREATE,
      message: message
    });
  }

  add(message) {
    this.appDispatcher.dispatch({
      actionType: MessageConstants.ADD,
      message: message
    });
  }

  fetch() {
    this.appDispatcher.dispatch({
      actionType: MessageConstants.FETCH
    });
  }
}

let messageActions = new MessageActions(appDispatcher);
export default messageActions;
