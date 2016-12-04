var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var About = require('About');
var Card = require('Card');
var EventData = require('EventData');

require('style!css!foundation-sites/dist/foundation.css')
require('style!css!foundation-sites/dist/custom.css')
require('style!css!foundation-sites/dist/animation.css')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={About}/>
      <Route path ="card/*" component={Card}/> 
      <IndexRoute component={EventData}/>
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