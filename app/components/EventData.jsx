var React = require ('react');
var DisplayEventData = require('DisplayEventData');
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

//var ref = firebase.database().ref('events');

var EventData = React.createClass({
    getInitialState: function () {
        return {
           hot: []
        }
    },
    componentWillMount: function () {
        console.log('hello');
        var allevents = [];
        var events = [];
        var test;
        
    },
    componentDidMount: function () {
            //var tits = [];
            var ref = firebase.database().ref('events');

            ref.on('value', snapshot => {
                var tits = snapshot.val();
                var hotvents = [];
                //console.log(tits["0"].title);
                var that = this;

                snapshot.forEach(function (data) {
                    var newtits = data.val();
                    console.log(newtits.date);

                    hotvents.push(newtits);
                    that.setState({hot: hotvents});
                });
            });

    },
    
   render: function () {
        console.log(this.state.hot);
        if (!this.state.hot) {
                return <div><Halogen className = "halogen" color="#5F7187" size="72px" margin="48px"/></div>
            }
        return (
            <div>
            
            <div className="row small-up-1 medium-up-2 large-up-4">
            
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {this.state.hot.map(card=>{
                    return <div className="small-3 columns end">
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

/*
<div className="row small-up-1 medium-up-2 large-up-4">
                <Link to="/card/">Card</Link>
                <div className="column">
                   
                    <div className="profile-card">
                        <div className="image-wrapper overlay-fade-in">
                             <img src="https://upload.wikimedia.org/wikipedia/en/6/69/UFC_Sacramento_poster.jpg" className="thumbnail" alt />
                             <div className="image-overlay-content">
                                <h2>{this.state.hot.event_score}</h2>
                                <Link to ={ '/card/' + this.state.hot.url } className="button">Card</Link>
                                <p>{this.state.hot.title}</p>
                             </div>
                             
                        </div>
                        
                    </div>
           
                </div>
            <ul>
            {this.state.hot.map(card=>{
                return <li></li>
            })
                
            }
            </ul>
            
            </div>


||||||||||||||||||||||||||||||||||||||||||||||||||

<div className="profile-info"></div>


            


<a href="/card" className="button">FIGHT CARD</a>
<div class="image-wrapper overlay-fade-in">
      
      <img src="https://tourneau.scene7.com/is/image/tourneau/DEV9900004?hei=450&wid=300&fmt=png-alpha&resMode=bicub&op_sharpen=1" />
      
      <div class="image-overlay-content">
        <h2>.overlay-fade-in</h2>
        <p class="price">$99.99</p>
        <a href="#" class="button">Get it</a>
      </div>
    
    </div>



*/