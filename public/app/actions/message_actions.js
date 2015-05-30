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
}

let messageActions = new MessageActions(appDispatcher);
export default messageActions;
