import appDispatcher from '../dispatchers/app_dispatcher';
import UserConstants from '../constants/UserConstants';

class UserActions {

  constructor(appDispatcher) {
    this.appDispatcher = appDispatcher;
  }

  add(user) {
    this.appDispatcher.dispatch({
      actionType: UserConstants.USER_ADD,
      user: user
    });
  }

  remove(user) {
    this.appDispatcher.dispatch({
      actionType: UserConstants.USER_REMOVE,
      user: user
    });
  }
}

let userActions = new UserActions(appDispatcher);
export default userActions;
