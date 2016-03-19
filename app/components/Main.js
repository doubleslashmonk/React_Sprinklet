var React = require('react');
var SearchBar = require('./SearchBar');

var Main = React.createClass({
  render : function (){
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop : 15}}>
            <SearchBar />
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Main;
