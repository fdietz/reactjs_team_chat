/** @jsx React.DOM */
import React from 'react';
import MessageList from "./MessageList.jsx!"

import MessageStore from '../stores/MessageStore'
import MessageActionsCreator from '../actions/MessageActionsCreator';

let MessageListComponent = class extends React.Component {
  constructor() {
    this.state = {
      messages: MessageStore.getAll()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
    MessageActionsCreator.fetch();
  }

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      messages: MessageStore.getAll()
    });
  }

  render() {
    return (
      <MessageList messages={this.state.messages}/>
    );
  }
}

export default MessageListComponent;