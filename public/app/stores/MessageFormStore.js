import appDispatcher from '../dispatchers/app_dispatcher';
import MessageConstants from '../constants/message_constants';
import ServerConstants from '../constants/ServerConstants';

import EventEmitter from 'wolfy87-eventemitter';

var CHANGE_EVENT = 'change';

class MessageFormStore {
  constructor(appDispatcher) {
    this._formErrors = [];
    this._emitter    = new EventEmitter();
  }

  getAllErrors() {
    return this._formErrors;
  }

  isValid() {
    return this._formErrors.length > 0;
  }

  setErrors(errors) {
    this._formErrors = errors;
    this.emitChange();
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
}

let messageFormStore = new MessageFormStore(appDispatcher);

appDispatcher.register((action) => {
  switch(action.actionType) {
    case ServerConstants.RECEIVE_CREATED_MESSAGE:
      if (action.data.errors) {
        messageFormStore.setErrors(action.data.errors);
      }

      break;
  }
});

export default messageFormStore;