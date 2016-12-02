var React = require('react');
var ReactDOM = require('react-dom');


function ContentHeader({title, date, location, score}) {
  return (
    
    <div className="callout large secondary slideRight">
        <div className="row">
          <div className="small-2 large-2 columns">
            <p></p>
          </div>
          <div className="small-8 large-8 columns event-info">
            <div className="top-info">
            <div className="circle"><h1>{score}</h1></div>
            <h6><small><abbr title="Cumulative Dwyer Score of all fighters on card">Total Score</abbr></small></h6>
              
              <h4>{title}</h4>
              <h5>{date}</h5>
              <h6>{location}</h6>
              
            </div>
          </div>
          <div className="small-2 large-2 columns">
            <p></p>
          </div>
        </div>
    </div>
    
  );
}

ContentHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  score: React.PropTypes.string.isRequired,
};

module.exports = ContentHeader;