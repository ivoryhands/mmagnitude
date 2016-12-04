var React = require('react');
var ReactDOM = require('react-dom');


function ContentHeader({title, date, location, score, fightersCount}) {
  return (
    
    <div className="callout large secondary slideRight">
        <div className="row">
          <div className="small-2 large-2 columns">
            <p></p>
          </div>
          <div className="small-8 large-8 columns">
            <div className="row">
              <div className="small-6 large-6 columns">
                  <div className="sqr"><h1>{score}</h1>
                    <h6><small>Dwyer Score</small></h6>
                  </div>
              </div>
              <div className="small-6 large-6 columns card-stuff">
                  <h2>{title}</h2>
                  <h5>{date}</h5>
                  <h5>{location}</h5>
                  <h5>{fightersCount} fights</h5>
              </div>
            </div>
              
          </div>
          <div className="small-2 large-2 columns">
            <p></p>
          </div>
        </div>
    </div>
    
  );
}



module.exports = ContentHeader;