/**
 * TODO:
 * - Create slideshow method
 *   - Set first active bigshot
 *   - After timeout, select next shot
 * 
 * @jsx React.DOM
 */

var React = require('react');
window.React = React; // This is so you can use the chrome react inspector

var ShotStore = require('./stores/ShotStore');
var ShotActionCreators = require('./actions/ShotActionCreators');
var WebAPI = require('./utils/WebAPI');
var Bigshot = require('./components/Bigshot');
var Shottie = require('./components/Shottie');

WebAPI.init();

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: [],
      activeShot: null
    };
  },
  _onChange: function() {
    this.setState({
      shots: ShotStore.getAll()
    });
  },
  render: function() {
    return(
      <div>
      
        <Bigshot/>

        <div className="shottie-list">
          {this.state.shots.map(function(shot) {
            if (!shot) {
              return null;
            }
            else {
              return <Shottie shot={shot} key={shot.id}/>;
            }
          })}
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    ShotStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ShotStore.removeChangeListener(this._onChange);
  }
});

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );