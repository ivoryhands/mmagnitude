var React = require ('react');
var {Link, IndexLink} = require('react-router');

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
        //this.handleScroll = this.handleScroll.bind(this);
        this.getData();
        return {
           message: 'start',
           load: [],
           pos: 0,
           loading: true,
           hot: [],
           hotcur: []
        }
        
    },
    handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        message:'bottom reached'
      });
      console.log("BOTTOM!");
      console.log(this.state.loading);
      var pos = this.state.pos;
      console.log(pos, this.state.hot.length);
      if (this.state.loading === false && this.state.hot.length != pos) {
           this.printList(pos); 
      }
      
      //if (this.state.hotcur.length === this.state.hot.length) {
        //    this.setState({
        //        loading: false
        //    });
     // }
      
      
    } else {
      this.setState({
        message:'not at bottom'
      });
      //console.log("NOT AT THE BOTTOM!");
    }
  },
  printList(pos) {
        console.log("print");
        var that = this;
        var chunk = 5;
        that.setState({loading: true});
        console.log(that.state.loading);
        var newchunk = 0;
        if (that.state.hot.length != pos) {
            if ((pos + chunk) > this.state.hot.length) {
                newchunk = this.state.hot.length - pos;
            }
            else {
                newchunk = pos+chunk;
            }
            console.log("pre-load", newchunk);
            for (var i = pos; i < newchunk+pos; i++) {
                    console.log("load");
                    var el = that.state.hot[i];
                    var zip = that.state.hotcur;
                    zip.push(el);
                    that.setState({hotcur: zip});
                    
                }
            var newCount = pos + newchunk;
            that.setState({pos: newCount});
            
        }
        that.setState({loading: false});
  },
  getData() {
    var ref = firebase.database().ref('events');

    ref.on('value', snapshot => {
        var tits = snapshot.val();
        var hotvents = [];
        var that = this;

        snapshot.forEach(function (data) {
            var newtits = data.val();
            var eventDate = new Date(newtits.date);     //get event date
            var currentDate = new Date();               //get current date
            
            if (currentDate > eventDate) {              //push only future events
                hotvents.push(newtits);
                console.log(newtits);
                console.log(hotvents);
            }
            that.setState({hot: hotvents});
            
            console.log(that.state.hot);
            
        });
        var pos = this.state.pos;
        that.printList(pos);
        console.log("ref printList");
        that.setState({message: 'FUCK'});
    }); 
  },
  
  
   render: function () {
        
        if (this.state.loading===true) {
            var cname = "";
        }
        else {
            var cname = "hide";
        }
        //console.log(this.state.load.length, this.state.hot.length);
        
        return (
            <div>
            
            {this.state.message}
            
            <div className="row">
                {this.state.hotcur.map((card,index) => {
                    return  <div className="small-12 large-4 columns" key={index}>
                                <div className="profile-card" key={index + "profile"}>
                                    <Link to ={ '/card/' + card.url }><img src={card.img} className="thumbnail" alt /></Link>
                                    <Link to ={ '/card/' + card.url }>{card.title}</Link>
                                    <p>{card.location}</p>
                                    <p>{card.date}</p>
                                </div>
                            </div>
                })}
            </div>
            <div className={cname}>
                <span>LOADING!</span>
            </div>
            
            </div>
        )
   } 
});



module.exports = EventData;
