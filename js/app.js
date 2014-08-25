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
var SocketState = require('./components/SocketState');
var AnimGroup = require('react/lib/ReactCSSTransitionGroup');

WebAPI.initSocketHandlers();

var App = React.createClass({
  getInitialState: function() {
    return {
      shots: [],
      activeShot: null
    };
  },
  _onChange: function() {
    this.setState({
      shots: ShotStore.getAllShots()
    });
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
  },
  componentWillUnmount: function() {
    ShotStore.removeChangeListener(this._onChange);
  }
});

window.ADD = function() {
  var fakeObj = {};
  var fakeId = new Date().getTime();
  fakeObj[fakeId] = {
    id: fakeId,
    title: "FAKE",
    image_url: "http://placehold.it/400x300.png",
    image_teaser_url: "http://placehold.it/200x150.png",
    url: "nerp",
  };
  ShotActionCreators.recieveSome(fakeObj, "popular");
};

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );