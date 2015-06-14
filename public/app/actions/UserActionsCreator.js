import AppDispatcher from '../dispatchers/AppDispatcher';
import UserConstants from '../constants/UserConstants';

class UserActionsCreator {

  constructor(AppDispatcher) {
    this.AppDispatcher = AppDispatcher;
  }

  add(user) {
    this.AppDispatcher.dispatch({
      actionType: UserConstants.USER_ADD,
      user: user
    });
  }

  remove(user) {
    this.AppDispatcher.dispatch({
      actionType: UserConstants.USER_REMOVE,
      user: user
    });
  }
}

let userActionsCreator = new UserActionsCreator(AppDispatcher);
export default userActionsCreator;
