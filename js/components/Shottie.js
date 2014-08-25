/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('react/lib/cx');
var ShotActionCreators = require('../actions/ShotActionCreators');
var Icon = require('./Icon');
var ImageLoader = require('react-imageloader');
var Loadie = require('./Loadie');

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

    var gif = <span className="shottie__label">GIF</span>;
    var preloader = function() {
      return <Loadie className="loadie--small"/>;
    };

    var classNames = cx({
      "shottie": true,
      "shottie--active": shot.isActive
    });

    return(
      <a onClick={this.handleClick} className={classNames}>
        <ImageLoader src={shot.teaser} preloader={preloader}>
        </ImageLoader>
        {shot.isGif ? gif:null}
        <Icon name="arrow"/>
      </a>
    );
  }
});

module.exports = Shottie;