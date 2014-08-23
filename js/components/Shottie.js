/**
 * @jsx React.DOM
 */

var React = require('react');
var ShotActionCreators = require('../actions/ShotActionCreators');
var Icon = require('./Icon');

var Shottie = React.createClass({
  propTypes: {
    shot: React.PropTypes.object
  },
  handleClick: function() {
    ShotActionCreators.setActive(this.props.shot.id);
  },
  render: function() {
    var shot = this.props.shot;

    if (!shot) return null;

    var gif = <span>GIF</span>;

    if (shot.isActive) {
      return(
        <a className="shottie shottie--active">
          <Icon name="arrow"/>
        </a>
      );
    } else {
      return(
        <a onClick={this.handleClick} className="shottie">
          <img src={shot.teaser} />
          {shot.isGif ? gif:null}
        </a>
      );
    }
  }
});

module.exports = Shottie;