/**
 * @jsx React.DOM
 */

var React = require('react');

var Shottie = React.createClass({
  propTypes: {
    shot: React.PropTypes.object
  },
  render: function() {
    var shot = this.props.shot;

    if (!shot) return null;

    return(
      <div className="shottie">
        <img src={shot.teaser} />
      </div>
    );
  }
});

module.exports = Shottie;