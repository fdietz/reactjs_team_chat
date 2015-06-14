import AppDispatcher from '../dispatchers/AppDispatcher';
import ServerConstants from '../constants/ServerConstants';

class ServerActionsCreator {

  constructor(AppDispatcher) {
    this.AppDispatcher = AppDispatcher;
  }

  receiveMessages(messages) {
    this.AppDispatcher.dispatch({
      actionType: ServerConstants.RECEIVE_MESSAGES,
      messages: messages
    });
  }

  receiveCreatedMessage(data) {
    this.AppDispatcher.dispatch({
      actionType: ServerConstants.RECEIVE_CREATED_MESSAGE,
      data: data
    });
  }

}

let serverActionsCreator = new ServerActionsCreator(AppDispatcher);
export default serverActionsCreator;
