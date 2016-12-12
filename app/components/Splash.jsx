var React = require ('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Nav = require('Nav');
var {Link, IndexLink} = require('react-router');

var Splash = React.createClass({
   render: function () {
       
        return (
            <div className="row space">
              <div className = "small-2 large-2 columns"><p></p></div>
              <div className = "small-8 large-8 columns">
                <div className="splash-title slideRight">
                    <object type="image/svg+xml" data="images/mmagnitude_animated.svg"></object>
                    <h4>Find event scores and fighter breakdowns for past and future MMA events.</h4>
                </div>
                <div className="btnEvents">
                    <Link to="/upcoming-events" className="secondary large button slideLeft">Upcoming Events</Link>
                    <Link to="/past-events" className="secondary large button slideLeft">Past Events</Link>
                </div>
              </div>
            <div className = "small-2 large-2 columns"><p></p></div>
          
            </div>
        )
   } 
});

module.exports = Splash;