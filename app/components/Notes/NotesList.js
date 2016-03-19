var React = require('react')

var NotesList = React.createClass({

  render: function(){
    /* Returns the array li tag for each note */
    var notes = this.props.notes.map(function(note, index){
      return <li className="list-group-item" key={index}> {note['.value']} </li>
    })
    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
});

module.exports = NotesList;
