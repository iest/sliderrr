/**
 * @jsx React.DOM
 */

var React = require('react');
var ImageLoader = require('react-imageloader');
var Icon = require('./Icon');
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
  handleClick: function() {
    this.props.switch();
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
          <button className="shot-btn" onClick={this.handleClick}>Shots</button>
          <img className="bigshot__shot" src={shot.image}/>
          <div className="bigshot__label">
            <img src={shot.player_image}/>
            <a href={shot.originalPage}>{shot.title}</a>
          </div>
          <div className="bigshot__btn">
            <Icon name="hamburger"/>
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