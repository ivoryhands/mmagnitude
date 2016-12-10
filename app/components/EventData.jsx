var React = require ('react');
var {Link, IndexLink} = require('react-router');
var Halogen = require('halogen/ClipLoader');
var Nav = require('Nav');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var firebase = require('firebase');

const options = [
  'one', 'two', 'three'
]
const defaultOption = options[0];

var config = {
    apiKey: "AIzaSyBQpgPVjQScAtAbgxZZ_BIs3jZhLD38SJY",
    authDomain: "events-558cd.firebaseapp.com",
    databaseURL: "https://events-558cd.firebaseio.com",
    storageBucket: "events-558cd.appspot.com",
    messagingSenderId: "81048302603"
};
firebase.initializeApp(config);


var EventData = React.createClass({
    
    getInitialState: function () {
        return {
           events: [],
           hotLength: 0,
           eventsDisplay: [],
           page: 0,
           previous: false,
           next: true,
           isLoading: true,
           offset: 0,
           hasMoreItems: true,
           loadedEvents: false,
           btnLoadingMsg: 'Load More',
           dropdownOptions: 'ddrrrrrop',
           order: 'ASC',
           btnSortClass: "fa fa-sort-amount-asc"
        }
    },
    componentWillMount: function () {
        var allevents = [];
        var events = [];
        var test;
        
        //console.log(this.props);
        
    },
    componentDidMount: function () {
        console.log('start!');
        var that = this;
        
        this.initLoad();
        //this.loadItems();
            

    },
    initLoad() {
        console.log(ref, "this is ref!");
        var ref = firebase.database().ref('events');
        var that = this;
        
        ref.on('value', function(snapshot) {
          var data = snapshot.val();
          
          that.setState({events: data }, function afterChange () {
             that.loadItems();
          });
        }, function(error) {
          console.error(error);
        });
        
    },
    loadItems() {
        
        /*  Show inital batch of items upon loading
        *   @param page_size - events shown in groups of 6
        *   @param length - length of all events in this.state.events
        *   @param offset - keeps track of position in array of this.state.events
        *   @param limit - ensures end doesn't exceed length
        */
        
        const page_size = 6;
        var length = this.state.events.length;
        var offset = this.state.offset;
        var limit = page_size + offset;
        if (limit > length) {
            limit = length;
            this.setState({btnLoadingMsg: 'All Loaded'});
        }
        
        var loadedEvents = this.state.events;
        var eventsDisplay = [];
        
        for(var i = 0; i < limit; i++) {
            
            var eventDate = new Date(loadedEvents[i].date);                 //get event date
            var currentDate = new Date();                                   //get current date
            currentDate.setDate(currentDate.getDate() -1);
            console.log(currentDate.getTime());
            console.log(eventDate.getTime());
            if (currentDate.getTime() < eventDate.getTime()) {              //push only future events
                eventsDisplay.push(loadedEvents[i]);
                console.log("pushing!")
            }
        }
        
        this.setState({isLoading: false});
        this.setState({hasMoreItems: false});
        this.setState({offset: limit});
        
        
        /*  Initial Date Sort
        *   @param sorttable - used to sort date array
        *   @param newEvents - new array to be displayed
        */
        var sortable = [];
        var newEvents = [];
        
        for (var x in eventsDisplay) {
            var d  = new Date(eventsDisplay[x].date);
            var dd = d.getTime();
            sortable.push(dd);
        }
        console.log(sortable);
        sortable.sort();
        
        for (let v of sortable) {
          for (let x of eventsDisplay) {
              var e = new Date(x.date);
              if (v === e.getTime()) {
                newEvents.push(x);
                console.log("match!");
                console.log(x.title);
              }
          }
        }
        
        this.setState({eventsDisplay: newEvents});
        
    },
    sorter() {
        console.log('sorter activated');
        if (this.state.order === "ASC") {
            this.setState({btnSortClass: "fa fa-sort-amount-asc"});
        }
        if (this.state.order === "DESC") {
            this.setState({btnSortClass: "fa fa-sort-amount-desc"});
        }
        var order = this.state.order;
        this.dateSort(this.state.eventsDisplay, order);
    },
    dateSort(events, order) {
        console.log(order);
        var sortable = [];
        var newEvents = [];
        
        for (var x in events) {
            var d = new Date (events[x].date);
            var dd = d.getTime();
            sortable.push(dd);
        }
        sortable.sort();
        if (order === "DESC") {
            sortable.reverse();
        }
        
        for (let v of sortable) {
          for (let x of events) {
              var e = new Date(x.date);
              if (v === e.getTime()) {
                newEvents.push(x);
              }
          }
        }
        if (order === "DESC") {
            this.setState({order: "ASC"});    
        }
        else {
            this.setState({order: "DESC"});
        }
        console.log(this.state.order);
        this.setState({eventsDisplay: newEvents});
    },
    
   render: function () {
       console.log(this.state.events.length,"events function length",this.state.loadedEvents);
      
        if (this.state.isLoading) {
                return <div><Halogen className = "halogen" color="#5F7187" size="72px" margin="48px"/></div>
            }
        
        var events = [];
        this.state.eventsDisplay.map((card, i) => {
            events.push(
                <div className="small-10 large-4 columns slideRight" key={i}>
                    <div className="profile-card" key={i + "profile"}>
                        <div className="frame-square">
                            <div className="crop">
                                <img src={card.img}/>
                            </div>
                        </div>
                        <div className="card-info">
                            <h6><Link to ={ '/card/' + card.url }>{card.title}</Link></h6>
                            <h6>{card.location}</h6>
                            <h6>{card.date}</h6>
                        </div>
                    </div>
                </div>
            );
        });
            
        return (
            <div>
                <div className="row">
                    <div className="small-1 large-1 columns"><p></p></div> 
                    <div className="small-10 large-10 columns">
                        <button type="button" onClick = {this.sorter} className="secondary button drop-size" href="#"><i className={this.state.btnSortClass} aria-hidden="true"></i></button>
                    </div>
                    <div className="small-1 large-1 columns"><p></p></div> 
                </div>
                
                <div className="row">
                
                    <div className="small-1 large-1 columns"><p></p></div>                
                    <div className="small-10 large-10 columns">
                    
                        {events}
                        
                    </div>
                    <div className="small-1 large-1 columns"><p></p></div>
                    
                </div>
                <button className="button load-more" onClick={this.loadItems}>{this.state.btnLoadingMsg}</button>
            </div>
        )
   } 
});

module.exports = EventData;