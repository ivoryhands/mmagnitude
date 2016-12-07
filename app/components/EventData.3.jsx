var React = require ('react');
var {Link, IndexLink} = require('react-router');
var Halogen = require('halogen/ClipLoader');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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
           hot: []
        }
    },
    componentWillMount: function () {
        var allevents = [];
        var events = [];
        var test;
        console.log(this.props);
        
    },
    componentDidMount: function () {
            var ref = firebase.database().ref('events');

            ref.on('value', snapshot => {
                var tits = snapshot.val();
                var hotvents = [];
                var that = this;

                snapshot.forEach(function (data) {
                    var newtits = data.val();
                    var eventDate = new Date(newtits.date);     //get event date
                    var currentDate = new Date();               //get current date
                    
                    if (currentDate < eventDate) {              //push only future events
                        hotvents.push(newtits);  
                    }
                    that.setState({hot: hotvents});
                });
            });

    },
    
   render: function () {
        
        if (!this.state.hot) {
                return <div><Halogen className = "halogen" color="#5F7187" size="72px" margin="48px"/></div>
            }
        return (
            <div>
            <Nav/>
            <div className="row small-up-1 medium-up-2 large-up-4">
            
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {this.state.hot.map((card,index)=>{
                    return <div className="small-3 columns end" key={index}>
                                <div className="profile-card slideRight">
                                    <div className="image-wrapper overlay-fade-in">
                                         <img src={card.img} className="thumbnail" alt />
                                         <div className="image-overlay-content">
                                            <h2>{card.event_score}</h2>
                                            <Link to ={ '/card/' + card.url } className="button">Card</Link>
                                            <p>{card.title}</p>
                                         </div>
                                    </div>
                                    <h5>{card.title}</h5>
                                    <h6>{card.date}</h6>
                                </div>
                            </div>
                })}
            </ReactCSSTransitionGroup>
            
            </div>
            
            </div>
        )
   } 
});

module.exports = EventData;