var React = require('react');
var Router = require('react-router');
var Home = require('../components/Home.js');
var Main = require('../components/Main.js');
var Profile = require('../components/Profile.js');

var Route =  Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
  <Route path = "/" component={Main}>
    <Route path = "profile/:username" component={Profile} />
    <IndexRoute component={Home} />
  </Route>
);
