/** @jsx React.DOM */
import React from 'react';
import ParticipantsList from "./participants_list.jsx!"

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <header>
          <h2>chitchat</h2>
          <img src="images/arrow-down.svg" className="arrow"></img>
        </header>

        <div className="sidebar-content">
          <h4 className="sidebar-nav-header">Channels</h4>

          <ul className="sidebar-nav-list">
            <li className="active">
              <a href="test"># general</a>
            </li>
          </ul>

          <h4 className="sidebar-nav-header">Participants</h4>
          <ParticipantsList/>
        </div>

        <footer>
          <img src="images/profile.jpg" className="avatar"></img>
          <div className="meta">
            <span className="author">{name}</span>
            <a href="">Logout</a>
          </div>

          <img src="images/arrow-up.svg" className="arrow"></img>
        </footer>
      </div>
    );
  }
}