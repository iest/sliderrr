/**
 * @jsx React.DOM
 */

var React = require('react');
window.React = React; // This is so you can use the chrome react inspector

var App = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Working</h1>
      </div>
    );
  }
});

React.renderComponent(
  <App/>,
  document.getElementById('app')
  );