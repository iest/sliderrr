/**
 * @jsx React.DOM
 */

var React = require('react');
var ImageLoader = require('react-imageloader');
var Loadie = require('./Loadie');
var ShotStore = require('../stores/ShotStore');
var AnimGroup = require('react/lib/ReactCSSTransitionGroup');

var Bigshot = React.createClass({
  getInitialState: function() {
    return {
      shot: {}
    };
  },
  _onChange: function() {
    this.setState({
      shot: ShotStore.getActiveShot()
    });
  },

  render: function() {
    var shot = this.state.shot;
    if (!shot) return null;
    if (!shot.image) return null;
    var styles = {
      backgroundImage: "url(" + shot.image + ")"
    };
    return(
        <div className="bigshot">
          <div className="bigshot__shot" style={styles}/>
          <div className="bigshot__label">
            <a href={shot.originalPage}>{shot.title}</a>
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

module.exports = Bigshot;