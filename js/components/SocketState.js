/**
 * @jsx React.DOM
 */

var React = require('react');
var SocketStore = require('../stores/SocketStore');
var Icon = require('./Icon');
var AnimGroup = require('react/lib/ReactCSSTransitionGroup');

var SocketState = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    };
  },
  _onChange: function() {
    this.setState({
      count: SocketStore.getCount()
    });
  },
  render: function() {
    var dots = [];
    for (var i = 0; i < this.state.count; i++) {
      dots[i] = (
        <li key={i}>
          <Icon name="dot"/>
        </li>
      );
    }
    dots.reverse();

    return(
      <ul className="socket-state">
        <AnimGroup transitionName="anim-socket-state">
          {dots}
        </AnimGroup>
      </ul>
    );
  },
  componentDidMount: function() {
    SocketStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SocketStore.removeChangeListener(this._onChange);
  }
});

module.exports = SocketState;