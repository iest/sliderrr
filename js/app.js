/**
 * @jsx React.DOM
 */

var React = require('react');
window.React = React; // This is so you can use the chrome react inspector

var ShotStore = require('./stores/ShotStore');
var WebAPI = require('./utils/WebAPI');

WebAPI.getShots();

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: []
    }
  },
  _onChange: function() {
    this.setState({shots: ShotStore.getAll()});
  },
  _poll: null,
  _startPoll: function() {
    this._poll = setInterval(WebAPI.getShots, 5000);
  },
  _stopPoll: function() {
    clearInterval(this._poll);
  },
  render: function() {
    return(
      <div>
        {this.state.shots.map(function(shot) {
          var src = shot.image_url;
          return <img src={src} key={shot.id}/>;
        })}
      </div>
    );
  },
  componentDidMount: function() {
    ShotStore.addChangeListener(this._onChange);
    this._startPoll();
  },
  componentWillUnmount: function() {
    ShotStore.removeChangeListener(this._onChange);
    this._stopPoll();
  }
});

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );