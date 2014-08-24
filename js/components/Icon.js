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
    <svg viewBox="0 0 170 152">
      <g transform="translate(0.000000, -18.000000)">
        <circle id="outer" stroke-dasharray="209,124" cx="85" cy="85" r="85"></circle>
        <circle id="middle" stroke-dasharray="151,90" transform="translate(84.000000, 86.000000) rotate(-1.000000) translate(-84.000000, -86.000000) " cx="84" cy="86" r="62"></circle>
        <circle id="inner" stroke-dasharray="105,51" transform="translate(84.000000, 86.000000) rotate(21.000000) translate(-84.000000, -86.000000) " cx="84" cy="86" r="37"></circle>
      </g>
    </svg>
};

module.exports = Icon;