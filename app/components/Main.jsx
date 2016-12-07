var React = require('react');
var Nav = require('Nav');
var {Link, IndexLink} = require('react-router');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Main = React.createClass({
  render: function () {
    return (

        <div>
        <Nav/>
          {this.props.children}
        </div>
        
    );
  }
});

module.exports = Main;
