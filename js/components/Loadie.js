/**
 * @jsx React.DOM
 */

var React = require('react');
var Icon = require('./Icon');

var Loadie = React.createClass({
  render: function() {
    return(
      <span className={"loadie " + this.props.className}>
        <Icon name="spinner"/>
      </span>
      );
  }
});

module.exports = Loadie;