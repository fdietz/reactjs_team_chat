import AppDispatcher from '../dispatchers/AppDispatcher';
import UserConstants from '../constants/UserConstants';

import EventEmitter from 'wolfy87-eventemitter';
import _ from "lodash";
import $ from "jquery";

var CHANGE_EVENT = 'change';

class UserStore {

  constructor(AppDispatcher) {
    this._users = [];
    this._emitter  = new EventEmitter();
  }

  emitChange() {
    this._emitter.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this._emitter.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this._emitter.removeListener(CHANGE_EVENT, callback);
  }

  add(attributes) {
    this._users.push(attributes);
    this.emitChange();
  }

  remove(user) {
    let _user = _.findWhere(this._users, { id: user.id });
    let index = _.indexOf(this._users, _user);

    if (index !== -1) {
      this._users.splice(index, 1);
      this.emitChange();
    }
  }

  getAll() {
    return this._users;
  }
}

let userStore = new UserStore(AppDispatcher);

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case UserConstants.USER_ADD:
      userStore.add(action.user);
      break;
    case UserConstants.USER_REMOVE:
      userStore.remove(action.user);
      break;
    // case MessageConstants.FETCH:
    //   userStore.fetch();
    //   break;
  }
});

export default userStore;
