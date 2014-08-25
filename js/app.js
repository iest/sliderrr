/**
 * TODO:
 * - Add category selection
 * - Fix styes on small screens
 * 
 * @jsx React.DOM
 */

var React = require('react');
window.React = React; // This is so you can use the chrome react inspector
var key = require('keymaster');

var ShotStore = require('./stores/ShotStore');
var ShotActionCreators = require('./actions/ShotActionCreators');
var WebAPI = require('./utils/WebAPI');
var Bigshot = require('./components/Bigshot');
var Shottie = require('./components/Shottie');
var SocketState = require('./components/SocketState');
var AnimGroup = require('react/lib/ReactCSSTransitionGroup');

WebAPI.initSocketHandlers();

var App = React.createClass({
  openCurrentShot: function() {
    var currentShotUrl = ShotStore.getActiveShot().originalPage;
    window.location = currentShotUrl;
  },
  nextSlide: function() {
    ShotActionCreators.selectNextShot();
  },
  prevSlide: function() {
    ShotActionCreators.selectPrevShot();
  },
  setupKeyListeners: function() {
    key('right', this.nextSlide);
    key('left', this.prevSlide);
    key('enter', this.openCurrentShot);
  },
  teardownKeyListeners: function() {
    key.unbind('right');
    key.unbind('left');
    key.unbind('enter');
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
        
        <Bigshot/>

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
    this.setupKeyListeners();
  },
  componentWillUnmount: function() {
    ShotStore.removeChangeListener(this._onChange);
    ShotActionCreators.stopSlideshow();
    this.teardownKeyListeners();
  }
});

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );