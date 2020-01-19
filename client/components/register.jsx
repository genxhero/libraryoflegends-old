import React, { Component } from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {hashHistory} from 'react-router';
import query from '../queries/current_user';
import { isSequential, hasTooManyRepeats} from '../helpers';
import ErrorsModal from './errors_modal';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            emailValid: null,
            usernameValid: null,
            userEnteredPassword: false,
            errors: null
        }
        // This format is far, far easier to debug than using the arrow methods.
        this.saveUser = this.saveUser.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
    }

    clearErrors() {
      this.setState({errors: null})
    }

    saveUser() {
        event.preventDefault();
        this.props.mutate({
            variables: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                bio: ""
                },
            refetchQueries: [{ query }]
          }).then( res => {
            hashHistory.push('/')
          })
          .catch(res => {
            this.setState({ errors: res.graphQLErrors})
          });
    }

    handleFormChange(field) {
        return event => this.setState({
          [field]: event.currentTarget.value,
          userEnteredPassword: field === 'password' || this.state.userEnteredPassword,
          [`${field}Valid`]: this.validateEntry(field, event.currentTarget.value)
        });
      }

      validateEntry(field, value) {
        switch(field) {
           case "email": {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
           }
           case "username": {
            return /^[a-zA-Z\d-_]+$/.test(value);
           }
        } 
      }

    render() {
      const repetitious = hasTooManyRepeats(this.state.password);
      const tooShort = this.state.password.length < 8;
      const passwordIsPassword = this.state.password.toLowerCase() === "password";
      const noMatch = this.state.password !== this.state.password2 && this.state.userEnteredPassword;
      const sequence = isSequential(this.state.password) && this.state.userEnteredPassword;
        return (
            <div className="session-page">
               <form onSubmit={this.saveUser} className="session-form">
                   <h1>Sign Up</h1>
                   <input className="auth-field" type="text" value={this.state.username} onChange={this.handleFormChange('username')} placeholder="Username"/>
                   <input className="auth-field" type="text" value={this.state.email} onChange={this.handleFormChange('email')} placeholder="Email"/>
                   <input className="auth-field" type="password"value={this.state.password} onChange={this.handleFormChange('password')} placeholder="Password"/>
                   <input className="auth-field" type="password"value={this.state.password2} onChange={this.handleFormChange('password2')} placeholder="Confirm Password" /> 
                   <div className="form-footer"> 
                     <ul className="error-zone">
                       {this.state.password !== this.state.password2  && <li> <span>Passwords must match</span></li>}
                       {(tooShort && this.state.userEnteredPassword) && <li> <span>Password is too short</span></li>}
                       {repetitious && <li> <span>Password has too many repeating characters</span></li>}
                       {sequence && <li> <span>Password is a sequential series.</span></li> }
                       {this.state.emailValid === false && <li><span>Invalid email address.</span></li>}
                       {this.state.usernameValid === false && <li><span>Username contains invalid characters.</span></li>}
                     </ul>
                   <input 
                     className="submit" 
                     type="submit" 
                     disabled={noMatch || passwordIsPassword || repetitious || tooShort || !this.state.emailValid || !this.state.usernameValid}/>
                   </div>
                   { passwordIsPassword && <span className="a-special-hell">PASSWORD IS NOT A VALID PASSWORD!!!! </span>}
               </form>
               {this.state.errors && <ErrorsModal errors={this.state.errors} clearErrors={this.clearErrors}/>}
            </div>
        );
    }
}

const mutation = gql`
mutation SignupMutation($email: String!, $password: String!, $username: String!, $bio: String) {
  addUser(email: $email, password: $password, username: $username, bio: $bio) {
    id
    username
    email
  }
}`

export default graphql(query)(
  graphql(mutation)(Register) 
);

/**
 * for recovery in case i messed up.
 *       <div className="auth-error-modal">
                 <div className="auth-error-message">
                    {this.state.errors.map(error => <span>{error.message}</span>)}
                    <button onClick={this.clearErrors}>OK</button>
                 </div>
                </div>
 */