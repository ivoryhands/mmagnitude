var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, Link} = require('react-router');
var Main = require('Main');
var About = require('About');
var Card = require('Card');
var EventData = require('EventData');
var EventDataPast = require('EventDataPast');
var Nav = require('Nav');
var Splash = require('Splash');
var AllEvents = require('AllEvents');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBQpgPVjQScAtAbgxZZ_BIs3jZhLD38SJY",
    authDomain: "events-558cd.firebaseapp.com",
    databaseURL: "https://events-558cd.firebaseio.com",
    storageBucket: "events-558cd.appspot.com",
    messagingSenderId: "81048302603"
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

require('style!css!foundation-sites/dist/foundation.css')
require('style!css!foundation-sites/dist/custom.css')
require('style!css!foundation-sites/dist/animation.css')
//require('style!css!foundation-sites/assets/font-awesome-4.7.0/css/font-awesome.css')

ReactDOM.render(
  <Router history={hashHistory}>
    
    <Route path="/" component={Main}>
      <Route path ="about" component={About}/>
      <Route path ="card/*" component={Card}/>
      <Route path ="past-events" component={EventDataPast}/>
      <Route path ="upcoming-events" component={EventData}/>
      <Route path ="all-events" component={AllEvents}/>
      <IndexRoute component={Splash}/>
    </Route>
    
  </Router>,
  document.getElementById('app')
);