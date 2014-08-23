/**
 * @jsx React.DOM
 */

var React = require('react');
var Danger = require('react/lib/danger');

var Icon = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return iconMap[this.props.name];
  }
});

// This could be an auto-generated, `require`d module
var iconMap = {

  arrow: <svg viewBox="0 0 370 388">
        <path d="M85,176 L85,329 L255,329 L255,176 L338,176 L169,0 L0,176 L85,176 Z"></path>
      </svg>
};

module.exports = Icon;