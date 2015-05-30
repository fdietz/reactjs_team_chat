/** @jsx React.DOM */
import React from 'react';
import WebSocket from '../lib/web_socket';

export default class ParticipantsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      participants: []
    };

    this._handleNewConnection = this._handleNewConnection.bind(this);
  }

  componentDidMount() {
    WebSocket.on('new_connection', this._handleNewConnection);
  }

  componentWillUnmount() {
    WebSocket.off('new_connection', this._handleNewConnection);
  }

  _handleNewConnection(data) {
    this.setState({
      participants: data.participants || []
    });
  }

  _participantItem(p) {
    return (
      <li key={p.id}>
        <a href="#">{p.name}</a>
      </li>
    );
  }

  render() {
    return (
      <ul className="sidebar-nav-list participants-list">
        {this.state.participants.map(this._participantItem)}
      </ul>
    );
  }
}