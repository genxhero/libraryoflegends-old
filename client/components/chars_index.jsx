import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/fetchchars';
import currentUser from '../queries/current_user';
import { numberSuffix, capitalize } from '../helpers';

class CharsIndex extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
     this.setState({
       characters: this.props.data.characters
     })
  }

   charList(characters){
     const timestamp = Date.now();
     return characters.map(char => {
       return (
         <div className="char-snippet"
          key={`${char.firstName}${timestamp}${char.lastName}${char.id}`} 
          value={`${char.id}`}
          >
          <div className="char-snippet-name">{char.firstName} {char.lastName}</div>
          <div className="char-snippet-class">{char.level}{numberSuffix(char.level)} level {capitalize(char.class)}</div>
        
           <div className="char-thumb-container">
             <img className="char-thumb" src={char.image ? `${char.image}` : "http://www.clarkegroup.co.uk/wp-content/uploads/2014/10/placeholder-employee.jpg"} />
          </div>
          <Link to={`/characters/${char.id}`} className="link-button">VIEW PROFILE</Link>
         </div>
       );
     });
   }

  render() {
    if (this.props.data.loading || !this.props.data.characters){
      return (<div>
          <h1>LOADING.......</h1>
      </div>);
    }
    const user = this.props.data.currentUser;
    const characters = this.props.data.characters;
    return (    
      <div className="index-page"> 
       <div className="intro-content">
          <h1 id="index-title">Welcome</h1>
          <p id="index-paragraph">You have entered the Library of Legends, where tales of great heroes lie.</p>
          <h2 id="index-title">Names of Legend</h2>
          </div>   
        <div className="chars-spread">
            {this.charList(characters)}
          </div>
          <div className="link-container"> 
          {
            user ? <Link to="/newchar" className="link-button">Create New Character</Link> :
              <h2> <Link to="/login">Log In </Link>or<Link to="/register">Sign Up</Link> to Create a New Character!</h2>
          }
           
          </div>
      </div>
       );
   }
}



export default graphql(query)(CharsIndex);