/**
 * @jsx React.DOM
 */

var React = require('react');
window.React = React; // This is so you can use the chrome react inspector

var ShotStore = require('./stores/ShotStore');
var ShotActionCreators = require('./actions/ShotActionCreators');
var WebAPI = require('./utils/WebAPI');
var Bigshot = require('./components/Bigshot');
var Shottie = require('./components/Shottie');

WebAPI.getShots();

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: [],
      activeShot: null
    }
  },
  _onChange: function() {
    console.log("onchange");
    this.setState({
      shots: ShotStore.getAll()
    });
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
      
        <Bigshot/>

        <div className="shottie-list">
          {this.state.shots.map(function(shot) {
            return <Shottie shot={shot} key={shot.id}/>;
          })}
        </div>
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