var React = require ('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var {Link, IndexLink} = require('react-router');
var firebase = require('firebase');
var Nav = require('Nav');

var AllEvents = React.createClass({
    getInitialState : function () {
            return {
            eventsDisplay: [],
            eventsAll: [],
            eventsLength: 1,
            eventValue: 'All',
            yearValue: 'All',
            yearDisplay: ''
            }
    },
    componentDidMount: function () {
            var that = this;
            function getAllEvents() {
                var ref = firebase.database().ref('events');
                
                var sorted = [];
                var sortedEvents = [];
                ref.once('value').then((snapshot) => {
                    var events = snapshot.val();
                    for(let x of events) {
                        sorted.push([x.event_score, x.title]);
                    }
                    
                    sorted.sort(function(a,b){
                        return b[0] - a[0];
                    });
                    for (let v of sorted) {
                        for (let x of events) {
                            if (v[1] === x.title) {
                                sortedEvents.push(x);
                            }
                        }
                    }
                    
                    that.setState({eventsDisplay: sortedEvents, eventsAll: sortedEvents, eventsLength: sortedEvents.length});
                    
                });
            }
            
            getAllEvents();
    },
    yearAndEventFilter (year, eventType) {

        /*  EventType Filter    
        *   @params     allEvents = allEvents from Firebase
        *   @params     eventsByType = empty array to store filtered type selection
        */
        
        var allEvents = this.state.eventsAll;
        var eventsByType = [];
        
        if (eventType != "All") {                       //If eventType is not All, find events that match type selected (i.e. PPVs)
            for (let x of allEvents) {
                if (x.event_type === eventType) {
                    eventsByType.push(x);
                }
            }    
        }
        else {                                          //Otherwise, return all events
            eventsByType = allEvents;
        }
        
        /*  Year Filter    
        *   @params     eventsByYear = empty array to store filtered year selection
        *   @params     d, dd, dStr = convert year in database to string for comparison to select box
        */
        
        var eventsByYear = [];
        
        if (year != "All") {                            //If year is not All, find events that match year select (i.e. 2016)
            for (let x of eventsByType) {
                var d = new Date(x.date);
                var dd = d.getFullYear();
                var dStr = dd.toString();
                if ( dStr === year) {
                    eventsByYear.push(x);
                }
            }
            this.setState({yearDisplay: 'in '+year});
        }
        else {                                          //Otherwise, return all events
            eventsByYear = eventsByType;
            this.setState({yearDisplay: ''});
        }
        this.setState({eventsDisplay: eventsByYear, eventsLength: eventsByYear.length});
        
    },
    yearSelect (event) {
        /*  Year Select Box
        *   @params year = target value from select box
        *   @params eventType = event select box current selection
        */
        var year = event.target.value;
        var eventType = this.state.eventValue;
        this.setState({yearValue: year});
        this.yearAndEventFilter(year,eventType);
        
        
    },
    eventSelect (event) {
        /*  Event Select Box
        *   @params year = year select box current selection
        *   @params eventType = target value from select box
        */
        var year = this.state.yearValue;
        var eventType = event.target.value;
        this.setState({eventValue: eventType});
        this.yearAndEventFilter(year,eventType);
        
    },
    render: function () {
        var events = [];
        var tableDisplay = [];
        var noResults = [];
        if (this.state.eventsLength > 0) {
            tableDisplay.push(<tr key="0"><th width='75%'>Event</th><th width='25%'>Score</th></tr>);
            this.state.eventsDisplay.map((card, i) => {
                    events.push(
                        <tr key={i}>
                            <td><Link to={"/card/"+card.url}>{card.title}</Link></td>
                            <td>{card.event_score}</td>
                        </tr>
                    );
            });
        }
        else {
            tableDisplay.push(<div key="0" className="no-result">No Results.</div>);
        }
       
        return (
            <div>
                <div className="callout large secondary slideRight">
                    <div className="row">
                        <div className="small-2 large-2 columns">
                            <p></p>
                        </div>
                        <div className="small-8 large-8 columns">
                            <h1>{this.state.eventValue} Events {this.state.yearDisplay} ({this.state.eventsLength})</h1>
                        </div>
                        <div className="small-2 large-2 columns">
                            <p></p>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                <div className="small-1 large-2 columns"><p></p></div>
                <div className="small-10 large-8 columns">
                    <div className="all-events slideRight">
                        <label htmlFor="right-label" className="text-left">Events</label>
                        <select id="right-label" onChange={this.eventSelect} value={this.state.eventValue}>
                            <option value="All">All</option>
                            <option value="PPV">PPV</option>
                            <option value="Fight Night">Fight Night</option>
                            <option value="TUF">TUF Finale</option>
                        </select>
                    </div>
                    <div className="all-events slideRight">
                        <label htmlFor="right-label" className="text-left">Year</label>
                        <select id="right-label" className="all-events" onChange={this.yearSelect} value={this.state.yearValue}>
                            <option value="All">All</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                        </select>
                    </div>
                
                </div>
                <div className="small-1 large-2 columns"><p></p></div>
                </div>
                <div className="row fadeIn slideUp">
                            <div className="small-1 large-2 columns">
                                <p></p>
                            </div>
                            <div className="small-10 large-8 columns mid-card">
                                <table className="tab-all-events">
                                    <thead>
                                        {tableDisplay}
                                        {events}
                                    </thead>
                                </table>
                            </div>
                            <div className="small-1 large-2 columns">
                                <p></p>
                            </div>
                </div>
            </div> 
        )
    } 
});

module.exports = AllEvents;