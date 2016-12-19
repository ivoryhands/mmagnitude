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
           order: 'DESC',
           btnSortClass: "fa fa-arrow-down",
           btnLoadingClassName: "button load-more"
        }
    },
    componentWillMount: function () {
        //var allevents = [];
        //var events = [];
        //var test;
        
    },
    componentDidMount: function () {
        var that = this;
        
        this.initLoad();
        if (this.isMounted) {
            console.log("mounted!");
        }
        else {
            console.log("not mounted");
        }
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
              var snapsDate = new Date(element.date.replace(/-/g, "/"));
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
        const page_size = 6;
        var length = this.state.events.length;
        var offset = this.state.offset;
        var limit = page_size + offset;
    
        if (limit > length) {
            limit = length;
            this.setState({btnLoadingMsg: 'All Loaded', btnLoadingClassName: 'button load-more hide'});
        }
        
        var loadedEvents = this.state.events;
        var pastEvents = [];
        
        for (var k = 0; k < limit; k++) {
            pastEvents.push(loadedEvents[k]);
        }
        
        this.setState({isLoading: false});
        this.setState({hasMoreItems: false});
        this.setState({offset: limit});
        
        if (pastEvents.length < page_size) {
            this.setState({btnLoadingMsg: 'All Loaded', btnLoadingClassName: 'button load-more hide'});
        }
        
        this.setState({eventsDisplay: pastEvents});
        
        
    },
    sorter() {
        if (this.state.order === "ASC") {
            this.setState({btnSortClass: "fa fa-arrow-down"});
        }
        if (this.state.order === "DESC") {
            this.setState({btnSortClass: "fa fa-arrow-up"});
        }
        var order = this.state.order;
        this.dateSort(this.state.eventsDisplay, order);
    },
    dateSort(events, order) {
        var sortable = [];
        var sortedEvents = [];
        
        for (let x of events) {
            var d = new Date(x.date.replace(/-/g, "/"));
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
                if (v[1] === x.title) {
                    sortedEvents.push(x);
                }
            }
        }
        
        if (order === "DESC") {
            this.setState({order: "ASC"});    
        }
        else {
            this.setState({order: "DESC"});
        }
        this.setState({eventsDisplay: sortedEvents});
        
    },
    
   render: function () {
      
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
                        <button type="button" onClick = {this.sorter} className="secondary button drop-size" href="#">DATE <i className={this.state.btnSortClass} aria-hidden="true"></i></button>
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
                <button className={this.state.btnLoadingClassName} onClick={this.loadItems}>{this.state.btnLoadingMsg}</button>
            </div>
        )
   } 
});

module.exports = EventDataPast;