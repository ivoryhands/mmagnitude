var React = require ('react');
var {Link, IndexLink} = require('react-router');
var Halogen = require('halogen/ClipLoader');
var Nav = require('Nav');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var InfiniteScroll = require('react-infinite-scroller');


var firebase = require('firebase');

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
           btnLoadingMsg: 'Load More'
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
    loadChunk() {
        console.log(this.state.events);
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
        const page_size = 6;
        var length = this.state.events.length;
        console.log(length,"length");
        var offset = this.state.offset;
        console.log(offset,"offset");
        var limit = page_size + offset;
        console.log(limit,"limit");
        if (limit > length) {
            limit = length;
            this.setState({btnLoadingMsg: 'All Loaded'});
        }
        //console.log("load items!");
        var loadedEvents = this.state.events;
        var eventsDisplay = [];
        
        for(var i = 0; i < limit; i++) {
            eventsDisplay.push(loadedEvents[i]);
            console.log("pushing!")
        }
        this.setState({eventsDisplay: eventsDisplay});
        this.setState({isLoading: false});
        this.setState({hasMoreItems: false});
        this.setState({offset: limit});
        console.log("eventsDisplay",eventsDisplay);
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