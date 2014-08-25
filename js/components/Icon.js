/**
 * @jsx React.DOM
 */

var React = require('react');

var Icon = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    var icon = iconMap[this.props.name];
    return <span className={"icon " + this.props.className}>{icon}</span>;
  }
});

// This could be an auto-generated, `require`d module
var iconMap = {

  arrow:
    <svg viewBox="0 0 370 388">
      <path d="M85,176 L85,329 L255,329 L255,176 L338,176 L169,0 L0,176 L85,176 Z"></path>
    </svg>,
  dot:
    <svg viewBox="0 0 26 26">
      <circle cx="13" cy="13" r="10"></circle>
    </svg>,
  spinner:
    <svg viewBox="0 0 215 215">
      <circle id="middle" transform="translate(108.500000, 108.500000) translate(-108.500000, -108.500000) " cx="108.5" cy="108.5" r="93.984127"></circle>
      <circle id="inner" cx="108.5" cy="108.5" r="56.0873016"></circle>
    </svg>
};

module.exports = Icon;