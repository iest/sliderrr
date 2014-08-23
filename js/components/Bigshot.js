/**
 * @jsx React.DOM
 */

var React = require('react');

var Bigshot = React.createClass({
  propTypes: {
    shot: React.PropTypes.object
  },
  render: function() {
    var shot = this.props.shot;

    if (!shot) return null;

    return(
      <div className="bigshot">
        <img src={shot.image} />
      </div>
    );
  }
});

module.exports = Bigshot;