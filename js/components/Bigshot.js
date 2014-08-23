/**
 * @jsx React.DOM
 */

var React = require('react');

var ShotStore = require('../stores/ShotStore');

var Bigshot = React.createClass({
  getInitialState: function() {
    return {
      shot: {}
    };
  },
  _onChange: function() {
    this.setState({
      shot: ShotStore.getActive()
    })
  },
  render: function() {
    var shot = this.state.shot;

    if (!shot) return null;

    return(
      <div className="bigshot">
        <img className="bigshot__low" src={shot.teaser} />
        <img className="bigshot__high" src={shot.image} />
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