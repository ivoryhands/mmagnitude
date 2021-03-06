var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function () {
    return (
      <div className = "top-bar slideUp">
        <div className = "top-bar-left">
          <ul className = "menu">
            <li className ="menu-text">MMAGNITUDE</li>
            <li>
              <IndexLink to="/" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
            </li>
            <li>
              <Link to="/upcoming-events" activeStyle={{fontWeight: 'bold'}}>Upcoming Events</Link>
            </li>
            <li>
              <Link to="/past-events" activeStyle={{fontWeight: 'bold'}}>Past Events</Link>
            </li>
            <li>
              <Link to="/all-events" activeStyle={{fontWeight: 'bold'}}>All Events</Link>
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
