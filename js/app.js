/**
 * TODO:
 * - After timeout, select next shot
 * - Animate bigshot
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
  _slideTimer: null,
  setupSlideshow: function() {
    this._slideTimer = setInterval(this.nextSlide, 3000);
  },
  teardownSlideshow: function() {
    clearInterval(this._slideTimer);
  },
  nextSlide: function() {
    ShotActionCreators.selectNextShot();
  },
  prevSlide: function() {
    ShotActionCreators.selectPrevShot();
  },
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
    this.setupSlideshow();
  },
  componentWillUnmount: function() {
    ShotStore.removeChangeListener(this._onChange);
    this.teardownSlideshow();
  }
});

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );