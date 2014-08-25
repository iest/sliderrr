/**
 * TODO:
 * - Animate bigshot
 * - Fix styes on small screens
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
var SocketState = require('./components/SocketState');
var AnimGroup = require('react/lib/ReactCSSTransitionGroup');

WebAPI.initSocketHandlers();

var App = React.createClass({
  nextSlide: function() {
    ShotActionCreators.selectNextShot();
  },
  prevSlide: function() {
    ShotActionCreators.selectPrevShot();
  },
  // Need to pause the slideshow if a user changes the active shot
  _onChange: function() {
    this.setState({
      shots: ShotStore.getAllShots()
    });
  },
  getInitialState: function() {
    return {
      shots: [],
      activeShot: null
    };
  },
  render: function() {
    return(
      <div>

        <SocketState/>
        
        <AnimGroup transitionName="anim-bigshot">
          <Bigshot/>
        </AnimGroup>

        <div className="shottie-list">
          <AnimGroup transitionName="anim-shottie">
            {this.state.shots.map(function(shot) {
              if (!shot) {
                return null;
              }
              else {
                return <Shottie shot={shot} key={shot.id}/>;
              }
            })}
          </AnimGroup>
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    ShotStore.addChangeListener(this._onChange);
    ShotActionCreators.startSlideshow();
  },
  componentWillUnmount: function() {
    ShotStore.removeChangeListener(this._onChange);
    ShotActionCreators.stopSlideshow();
  }
});

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );