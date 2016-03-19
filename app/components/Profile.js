var React = require('react');
var Router = require('react-router');
var Repos = require('./GitHub/Repos');
var UserProfile = require('./GitHub/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState : function(){
    return {
      notes: [1,2,3],
      bio: {
        name: 'Mudassir Malik'
      },
      repos: ['a', 'b', 'c']
    }
  },

  componentDidMount : function(){
      this.ref = new Firebase('https://reactsprinklet.firebaseio.com/');
      /* bind to property 'notes' of the state */
      var childRef = this.ref.child(this.props.params.username);
      this.bindAsArray(childRef,'notes');
  },

  componentWillUnmount : function(){
    /* Remove listener when the component has moved on */
    this.unbind('notes');
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
         <Notes username={this.props.params.username} notes={this.state.notes}/>
       </div>
     </div>
    )
  }
});

module.exports = Profile;
