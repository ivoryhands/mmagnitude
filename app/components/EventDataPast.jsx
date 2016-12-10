var React = require ('react');
var {Link, IndexLink} = require('react-router');
var Halogen = require('halogen/ClipLoader');
var Nav = require('Nav');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var firebase = require('firebase');

var EventDataPast = React.createClass({
    
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
        /*  Initial Past Events Loader
        *   @param ref - Events node in Firebase
        *   @param oldEvents - events array to be displayed
        */
        var ref = firebase.database().ref('events');
        var that = this;
        var oldEvents = [];
        
        ref.on('value', function(snapshot) {
          var data = snapshot.val();
          var length = data.length;
          var sortable = [];
          
          data.forEach( function(element, index) {
              var currentDate = new Date();
              currentDate.setDate(currentDate.getDate() -1);
              var snapsDate = new Date(element.date);
              if ( currentDate.getTime() > snapsDate.getTime() ) {
                  sortable.push([snapsDate.getTime(), element.title]);
              }
              length = length -1;
              /*    Sort Past Events from newest to oldest
              *     @params sortable - 
              */    
              if (length === 0) {
                sortable.sort(function(a,b){
                    return b[0] - a[0];
                });
                for (let v of sortable) {
                  for (let x of data) {
                      var i = 0;
                      if (v[1] === x.title) {
                        oldEvents.push(x);
                      }
                      i++;
                  }
                }
                console.log(oldEvents);
                  
                that.setState({events: oldEvents }, function afterChange () {
                     that.loadItems();
                });
              }
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
        console.log(this.state.events);
        const page_size = 6;
        var length = this.state.events.length;
        console.log(length);
        var offset = this.state.offset;
        console.log(offset);
        var limit = page_size + offset;
        console.log(limit);
        if (limit > length) {
            limit = length;
            this.setState({btnLoadingMsg: 'All Loaded'});
        }
        
        var loadedEvents = this.state.events;
        var pastEvents = [];
        
        for (var k = 0; k < limit; k++) {
            pastEvents.push(loadedEvents[k]);
        }
        
        console.log(pastEvents);
        
        this.setState({isLoading: false});
        this.setState({hasMoreItems: false});
        this.setState({offset: limit});
        
        this.setState({eventsDisplay: pastEvents});
        
        
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
        var sortedEvents = [];
        
        for (let x of events) {
            //console.log(x.date);
            var d = new Date(x.date);
            sortable.push([d.getTime(), x.title]);    
        }
        sortable.sort(function(a,b){
            return b[0] - a[0];
        });
        if (order === "DESC") {
            sortable.sort(function(a,b){
                return a[0] - b[0];
            });     
        }
        for (let v of sortable) {
            for (let x of events) {
                //console.log(x);
                //console.log(v);
                    if (v[1] === x.title) {
                        sortedEvents.push(x);
                    }
            }
        }
        console.log(sortedEvents);
        
        if (order === "DESC") {
            this.setState({order: "ASC"});    
        }
        else {
            this.setState({order: "DESC"});
        }
        
        this.setState({events: sortedEvents }, function afterChange () {
            this.loadItems();
        });
        
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

module.exports = EventDataPast;