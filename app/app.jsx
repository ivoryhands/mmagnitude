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
      <IndexRoute component={Splash}/>
    </Route>
    
  </Router>,
  document.getElementById('app')
);

/*
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={About}/>
      <IndexRoute component={Weather}/>
    </Route>
  </Router>,
  document.getElementById('app')



*/