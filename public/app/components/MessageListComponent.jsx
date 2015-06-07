/** @jsx React.DOM */
import React from 'react';
import MessageList from "./message_list.jsx!"

import messageStore from '../stores/message_store'
import MessageActions from '../actions/message_actions';

let MessageListComponent = class extends React.Component {
  constructor() {
    this.state = {
      messages: messageStore.getAll()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    messageStore.addChangeListener(this._onChange);
    MessageActions.fetch();
  }

  componentWillUnmount() {
    messageStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      messages: messageStore.getAll()
    });
  }

  render() {
    return (
      <MessageList messages={this.state.messages}/>
    );
  }
}

export default MessageListComponent;