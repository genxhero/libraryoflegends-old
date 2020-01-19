import React, { Component } from 'react';
import {Link} from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/current_user';
import gql from 'graphql-tag';

class Header extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.mutate({
      refetchQueries: [ { query } ]
    })
  }

  renderErrors() {
    if (this.props.data.error || this.state.dummyError) {
      return <div className="error-popup">
         {this.props.data.error}
      </div>
    } else {
      return <div />
    }
  }


  render() {
    return (
      <div className="header">
        <div className ="header-content">
                  <div className="header-buffer" />
         <div className="header-left"> 
           <Link className="home-link" to="/"> 
              <h1 className="header-title"> 
                <span className="stud-top-left"/> 
                <span className="stud-top-right" />
                <span className="stud-bottom-left"/> 
                <span className="stud-bottom-right" />
                Library of Legends
              </h1>
            </Link>
         </div>
         {this.props.data.currentUser ? 
          <div className="header-right" id="header-right">
            <h3 className="custom-welcome">Welcome, <Link className="custom-welcome-link" to={`/users/${this.props.data.currentUser.username}`}>{this.props.data.currentUser.username}</Link></h3>
               <div className="header-link" onClick={this.logout}>Logout</div>
           </div>
         : 
           <div className="header-right" id="header-right">
             <Link className="header-link" to="/register">Register</Link>
             <Link className="header-link"to="/login">Login</Link>
           </div>
         }
        </div>

          
      </div>
    )
  }
}

const mutation = gql`
mutation {
  logout {
    id
    username
  }
}`

export default graphql(mutation)(
  graphql(query)(Header));
