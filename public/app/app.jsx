/** @jsx React.DOM */
import React from 'react'
import Sidebar from './components/sidebar.jsx!'
import MessageList from "./components/message_list.jsx!"
import MessageForm from "./components/message_form.jsx!"

import messageStore from './stores/message_store'
import appDispatcher from './dispatchers/app_dispatcher';

import WebSocket from './lib/web_socket';
import Auth from "./lib/auth";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: messageStore.getAll()
    };

    this._onChange = this._onChange.bind(this);
    this._handleIncomingMessage = this._handleIncomingMessage.bind(this);
    this._handleNewConnection = this._handleNewConnection.bind(this);
    this._handleUserDisconnected = this._handleUserDisconnected.bind(this);
  }

  componentDidMount() {
    messageStore.addChangeListener(this._onChange);
    messageStore.fetch();

    WebSocket.on('incoming_message',  this._handleIncomingMessage);
    WebSocket.on('new_connection',    this._handleNewConnection);
    WebSocket.on('user_disconnected', this._handleUserDisconnected);
  }

  componentWillUnmount() {
    messageStore.removeChangeListener(this._onChange);

    WebSocket.off('incoming_message',  this._handleIncomingMessage);
    WebSocket.off('new_connection',    this._handleNewConnection);
    WebSocket.off('user_disconnected', this._handleUserDisconnected);
  }

  _handleIncomingMessage(data) {
    messageStore.add({ text: data.text, user: data.user, created_at: data.created_at, type: "message" });
  }

  _handleUserDisconnected(data) {
    messageStore.add({ text: `User ${data.user.name} disconnected`, name: "System", created_at: data.created_at, type: "notification" });
  }

  _handleNewConnection(data) {
    if (Auth.getCurrentUser()) {
      messageStore.add({ text: `User ${data.user.name} joined`, name: "System", created_at: data.created_at, type: "notification" });
    } else {
      data.messages.forEach(function(message) {
        messageStore.add(message);
      });
    }
  }

  _onChange() {
    this.setState({
      messages: messageStore.getAll()
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="main-content">

          <div className="main-header">
            <div className="left">
              <h2># general</h2>
            </div>
            <div className="right">
              <input className="search" type="search" placeholder="Search..."/>
            </div>
          </div>

          <MessageList messages={this.state.messages}></MessageList>
          <MessageForm></MessageForm>
        </div>
      </div>
    )
  }
}

React.render(<App/>, document.getElementById('app'))