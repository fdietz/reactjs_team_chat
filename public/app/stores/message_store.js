import appDispatcher from '../dispatchers/app_dispatcher';
import MessageConstants from '../constants/message_constants';

import Auth from '../lib/auth';

import EventEmitter from 'wolfy87-eventemitter';
import _ from "lodash";
import $ from "jquery";

var CHANGE_EVENT = 'change';

class MessageStore {

  constructor(appDispatcher) {
    this._messages = [];
    this._emitter  = new EventEmitter();

    this.currentId = 1;

    this.appDispatcher = appDispatcher;

    this._register();
  }

  _register() {
    this.appDispatcher.register((action) => {
      switch(action.actionType) {
        case MessageConstants.CREATE:
          let params = {
            text:       action.message.text.trim(),
            created_at: new Date().toISOString(),
            user_id:    Auth.getCurrentUser().id
          };

          $.ajax({
            type: "POST",
            url: "/messages",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){},
            failure: function(error) { alert(error); }
          });

          break;
      }
    });
  }

  // TODO: implement backend request
  fetch() {
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

let messageStore = new MessageStore(appDispatcher);
export default messageStore;
