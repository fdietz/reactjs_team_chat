import AppDispatcher from '../dispatchers/AppDispatcher';
import MessageConstants from '../constants/MessageConstants';
import ServerConstants from '../constants/ServerConstants';

import EventEmitter from 'wolfy87-eventemitter';
import _ from "lodash";
import $ from "jquery";

var CHANGE_EVENT = 'change';

let messageErrors = [];

class MessageStore {

  constructor(AppDispatcher) {
    this._messages = [];
    this._emitter  = new EventEmitter();

    this.currentId = 1;
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

  _nextId() {
    return this.currentId++;
  }

  add(attributes) {
    let message = _.extend({ id: this._nextId() }, attributes);
    this._messages.push(message);
    this.emitChange();
  }

  addBulk(messages) {
    messages.forEach(function(message) {
      _.extend(message, { id: this._nextId() });
    }.bind(this));

    this._messages = messages;
    this.emitChange();
  }

  update(id, attributes) {
    let message = get(id);
    _.extend(message, attributes);
    this.emitChange();
  }

  remove(message) {
    let index = _.indexOf(this._messages, message);

    if (index !== -1) {
      this._messages.splice(index, 1);
      this.emitChange();
    }
  }

  get(id) {
    return _.findWhere(this._messages, { id: id });
  }

  getAll() {
    return this._messages;
  }
}

let messageStore = new MessageStore(AppDispatcher);

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ServerConstants.RECEIVE_CREATED_MESSAGE:
      if (action.data.message) {
        messageStore.add(action.data.message);
        messageErrors = [];
      }

      break;
    case MessageConstants.MESSAGE_ADD:
      messageStore.add(action.message);
      break;
    case ServerConstants.RECEIVE_MESSAGES:
      messageStore.addBulk(action.messages);
      break;
  }
});

export default messageStore;
