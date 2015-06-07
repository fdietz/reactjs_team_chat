/** @jsx React.DOM */
import React from 'react';

import userStore from '../stores/UserStore';

export default class ParticipantsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      participants: userStore.getAll()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    userStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    userStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      participants: userStore.getAll()
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