import AppDispatcher from '../dispatchers/AppDispatcher';
import UserConstants from '../constants/UserConstants';

export default {

  add: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_ADD,
      user: user
    });
  },

  remove: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REMOVE,
      user: user
    });
  }
}