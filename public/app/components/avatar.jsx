/** @jsx React.DOM */
import React from 'react'

let colorMapping = {};

export default class Avatar extends React.Component {

  constructor() {
  }

  // http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
  _randomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color   = '#';

    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  render() {
    if (!colorMapping[this.props.user.id]) colorMapping[this.props.user.id] = this._randomColor();
    let style = { backgroundColor: colorMapping[this.props.user.id] };

    return (
      <div className="avatar" style={style}>
        <span className="initials">{this.props.user.initials}</span>
      </div>
    )
  }
}