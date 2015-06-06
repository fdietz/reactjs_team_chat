/** @jsx React.DOM */
import React from 'react';
import MessageActions from '../actions/message_actions';
import Auth from '../lib/auth';

var ESCAPE_KEY = 27;
var ENTER_KEY  = 13;

export default class MessageForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = { editText: "" };
  }

  handleSubmit(event) {
    var messageText = this.state.editText.trim();

    if (messageText) {
      this.setState({ editText: "" });

      MessageActions.create({
        text:       messageText,
        created_at: new Date().toISOString(),
        user_id:    Auth.getCurrentUser().id
      });
    }
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: "" });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    this.setState({ editText: event.target.value });
  }

  render() {
    return (
      <div className="message-form">
        <form>
          <textarea
            ref="editField"
            value={this.state.editText}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            placeholder="Press enter to send message"
            autoFocus={true}/>
        </form>
      </div>
    );
  }

}
