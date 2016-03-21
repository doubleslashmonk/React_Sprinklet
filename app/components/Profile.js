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

  /* Returns states on initial rendering */
  getInitialState : function(){
    return {
      notes: [],
      bio: {
        name: ''
      },
      repos: []
    }
  },

  /* Handles the props change post initial rendering (Searching for other username post initial render) */
  componentWillReceiveProps : function (nextProps){
    this.unbind('notes');
    this.init(nextProps.params.username);
  },


  /* Gets GitHub Bio and Repo through promises using Helper.js */
  init : function (username){
    /* binds to the property 'notes' of the state */
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

  /* Sets new note through FireBase */
  handleAddNotes : function(newNote){
    /* Use .Push() if you don't need specific key for your note*/
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },


  /* Renders the component */
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
  },

  /* DOM is accessible here, DOM Manipulations and data fetching will be done here */
  componentDidMount : function(){
        this.ref = new Firebase('https://reactsprinklet.firebaseio.com/');
        this.init(this.props.params.username);
    },

  /* Remove listener when the component has moved on */
  componentWillUnmount : function(){
      this.unbind('notes');
    },
});

module.exports = Profile;
