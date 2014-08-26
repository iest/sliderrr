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
var cx = require('react/lib/cx');

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
  _onChange: function() {
    this.setState({
      shots: ShotStore.getAllShots()
    });
  },
  _handleSwitch: function() {
    this.setState({
      menuActive: !this.state.menuActive
    });
  },
  getInitialState: function() {
    return {
      shots: [],
      activeShot: null,
      menuActive: false
    };
  },
  render: function() {
    var menuActiveClasses = cx({
      "container": true,
      "menu-active": this.state.menuActive
    });
    return(
      <div className={menuActiveClasses}>

        <SocketState/>
        
        <Bigshot switch={this._handleSwitch}/>

        <div className="menu">
          <ul className="category-menu">
            <li>Popular</li>
            <li>Debuts</li>
            <li>Everyone</li>
          </ul>
          <button className="done-btn" onClick={this._handleSwitch}>Done</button>
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