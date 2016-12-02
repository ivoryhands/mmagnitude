var React = require ('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var About = React.createClass({
   render: function () {
       
       
       
       
        return (
           
            <div className="row buffer slideRight">
              <div className="small-2 large-2 columns"><p></p></div>
              <div className="small-8 large-8 columns">
                  
                    <div className="row faq ">
               
                        <h5>What is MMA Momentum Gauge?</h5>
                    
                        
                        <p>
                            This app analyzes UFC events to determine its' Dwyer Score based upon the fighters who
                            are scheduled to fight on the card.
                        </p>
                    </div>
                
                    <div className="row faq ">
                        <h5>What is the Dwyer Score?</h5>
                        <p>
                            The purpose of the Dwyer Score is to gauge the magnitude, or importance, of an event.
                        </p>
                        <p>
                            Analyzing each fighter's record to determine their current win or loss streak and adding it
                            to the total for the event.  For example, if a fighter has a 3 fight win streak, they contribute
                            +3 to the total Dwyer Score for the event.  If a fighter has lost their last two contests, they
                            contribute -2.  Other fight results such as draws and no contests are ignored.  The Dwyer Score
                            was originally created by Nick Dwyer.
                        </p>
                        
                    </div>
                    <div className="row faq">
                        <h5>Why develop MMA Momentum Guage?</h5>
                        <p>
                            Calculating a Dwyer Score for an event by hand can be a time consuming experience as you have to
                            look at each individual fighters' record.  By nature, fight cards can routinely change based upon
                            injuries and replacement fighters causing the Dwyer Score to fluctuate.  This app is designed to 
                            generate Dwyer Scores as events are announced.
                        </p>
                        
                    </div>
                    <div className="row faq">
                        <h5>What is the goal for MMA Momentum Guage?</h5>
                        <p>
                            Initially designed to forumalte Dwyer Scores for future events, other plans for this app are to
                            generate Dwyer Scores for past events.  Additionally, in the sports world where data and statistics are
                            more looked at than ever, an API service will be developed to provide the unique data gathering capabilities
                            of this app to be used by other developers.
                        </p>
                    </div>
                    <div className="row faq">
                        <h6>MMA Momentum Guage developed and designed by Eric Page.</h6>
                        
                    </div>
              </div>
              <div className="small-2 large-2 columns"><p></p></div>
            </div>
           
        )
   } 
});

module.exports = About;