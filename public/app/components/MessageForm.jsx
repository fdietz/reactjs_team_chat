/** @jsx React.DOM */
import React from 'react';
import MessageActionsCreator from '../actions/MessageActionsCreator';
import Auth from '../lib/Auth';
import MessageFormStore from '../stores/MessageFormStore';

var ESCAPE_KEY = 27;
var ENTER_KEY  = 13;

export default class MessageForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editText: "",
      isValid: true
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MessageFormStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MessageFormStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("onChange")
    this.setState({
      editText: this.refs.editField.value,
      isValid: MessageFormStore.isValid()
    });
  }

  handleSubmit(event) {
    var messageText = this.state.editText.trim();

    this.setState({
      editText: "",
      isValid: true
    });

    console.log("Auth", Auth, Auth.getCurrentUser())
    MessageActionsCreator.create({
      text:       messageText,
      created_at: new Date().toISOString(),
      user_id:    Auth.getCurrentUser().id
    });
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: "" });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    this.setState({
      editText: event.target.value,
      isValid: true
    });
  }

  render() {
    let style = this.state.isValid ? {} : { borderColor: "red" };

    return (
      <div className="message-form">
        <form>
          <textarea
            ref="editField"
            value={this.state.editText}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            placeholder="Press enter to send message"
            autoFocus={true}
            style={style}/>
        </form>
      </div>
    );
  }

}
