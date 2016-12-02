var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function () {
    return (
      <div className = "top-bar slideUp">
        <div className = "top-bar-left">
          <ul className = "menu">
            <li className ="menu-text">MMA Momentum Gauge</li>
            <li>
              <IndexLink to="/" activeStyle={{fontWeight: 'bold'}}>Upcoming Events</IndexLink>
            </li>
            <li>
              <Link to="/about" activeStyle={{fontWeight: 'bold'}}>About</Link>
            </li>
          </ul>
        </div>
        <div className = "top-bar-right">
        </div>
      </div>
    );
  }
});

module.exports = Nav;
