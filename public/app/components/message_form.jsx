/** @jsx React.DOM */
import React from 'react';
import MessageActions from '../actions/message_actions';

var ESCAPE_KEY = 27;
var ENTER_KEY  = 13;

export default class MessageForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = { editText: "" };
  }

  handleSubmit(event) {
    var val = this.state.editText.trim();

    if (val) {
      this.setState({ editText: "" });
      let userId = 1;

      MessageActions.create({ text: val, userId: userId });
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
            onBlur={this.handleSubmit.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            placeholder="Press enter to send message"
            autoFocus={true}/>
        </form>
      </div>
    );
  }

}
