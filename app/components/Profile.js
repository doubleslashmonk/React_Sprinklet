var React = require('react');
var Router = require('react-router');
var Repos = require('./GitHub/Repos');
var UserProfile = require('./GitHub/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var helpers = require('./Utils/Helper');


var Profile = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState : function(){
    return {
      notes: [],
      bio: {
        name: ''
      },
      repos: []
    }
  },

  componentDidMount : function(){
      this.ref = new Firebase('https://reactsprinklet.firebaseio.com/');
      this.init(this.props.params.username);
  },

  componentWillReceiveProps : function (nextProps){
    this.unbind('notes');
    this.init(nextProps.params.username);
  },

  init : function (username){
    /* bind to property 'notes' of the state */
    var childRef = this.ref.child(username);
    this.bindAsArray(childRef,'notes');

    helpers.getGitHubInfo(username)
    .then(function(data){
      this.setState({
        bio:data.bio,
        repos:data.repos
      })
    }.bind(this))
  },

  componentWillUnmount : function(){
    /* Remove listener when the component has moved on */
    this.unbind('notes');
  },

  handleAddNotes : function(newNote){
    /* Update firebase with new note. Using .set() to set manual key. */
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },

  render : function(){

    return (
      <div className="row">
       <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
       </div>
       <div className="col-md-4">
        <Repos username={this.props.params.username} repos={this.state.repos}/>
       </div>
       <div className="col-md-4">
         <Notes
           username={this.props.params.username}
           notes={this.state.notes}
           addNote={this.handleAddNotes} />
       </div>
     </div>
    )
  }
});

module.exports = Profile;
