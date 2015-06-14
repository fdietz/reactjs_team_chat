import React from 'react'
import Sidebar from './components/Sidebar.jsx!'
import MessageListComponent from "./components/MessageListComponent.jsx!"
import MessageForm from "./components/MessageForm.jsx!"

import WebSocket from "./lib/WebSocket";

class App extends React.Component {

  constructor(props) {
    super(props);
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

          <MessageListComponent/>
          <MessageForm/>
        </div>
      </div>
    )
  }
}

React.render(<App/>, document.getElementById('app'))