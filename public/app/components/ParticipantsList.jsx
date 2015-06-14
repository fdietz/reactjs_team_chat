/** @jsx React.DOM */
import React from 'react';

import UserStore from '../stores/UserStore';

export default class ParticipantsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      participants: UserStore.getAll()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      participants: UserStore.getAll()
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