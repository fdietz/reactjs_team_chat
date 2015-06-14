import appDispatcher from '../dispatchers/app_dispatcher';
import ServerConstants from '../constants/ServerConstants';

class ServerActionsCreator {

  constructor(appDispatcher) {
    this.appDispatcher = appDispatcher;
  }

  receiveMessages(messages) {
    this.appDispatcher.dispatch({
      actionType: ServerConstants.RECEIVE_MESSAGES,
      messages: messages
    });
  }

  receiveCreatedMessage(data) {
    this.appDispatcher.dispatch({
      actionType: ServerConstants.RECEIVE_CREATED_MESSAGE,
      data: data
    });
  }

}

let serverActionsCreator = new ServerActionsCreator(appDispatcher);
export default serverActionsCreator;
