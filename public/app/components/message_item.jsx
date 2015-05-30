/** @jsx React.DOM */
import React from 'react'
import moment from 'moment'
import Avatar from "./avatar.jsx!"
import FormatMessage from "../lib/format_message"

export default class MessageItem extends React.Component {

  render() {
    let formattedMessage = this.props.message.text;
        formattedMessage = FormatMessage.breakNewLine(formattedMessage);
        formattedMessage = FormatMessage.autoLink(formattedMessage);

    let relativeDateTime = moment(this.props.message.created_at).fromNow();

    let rawMessageItem = (
      <div className="message" dangerouslySetInnerHTML={{ __html:formattedMessage }}>
      </div>
    );

    if (this.props.message.type === "message") {
      return (
        <div className="message-item message">
          <Avatar user={this.props.message.user} />
          <div className="message-container">
            <div className="meta">
              <span className="author">{this.props.message.user.name}</span><span className="date">{relativeDateTime}</span>
            </div>
            {rawMessageItem}
          </div>
        </div>
      );
    } else {
      return (
        <div className="message-item notification">
          <div className="message-container">
            <div className="meta">
              <span className="date">{relativeDateTime}</span>
            </div>
            {rawMessageItem}
          </div>
        </div>
      );
    }
  }
}
