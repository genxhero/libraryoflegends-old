import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import currentUser from '../queries/current_user';

class EditPersonal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            age: this.props.age,
            first: this.props.first,
            last: this.props.last,
            lastValid: true,
            firstValid: true,
            ageValid: true
        }
        this.updatePersonal = this.updatePersonal.bind(this);
        this.updateText = this.updateText.bind(this);
        this.validateTextInput = this.validateTextInput.bind(this);
        this.validateNumericInput = this.validateNumericInput.bind(this);
        this.allFieldsValid = this.allFieldsValid.bind(this);
    }

    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: this.validateTextInput(event.currentTarget.value)
        });
    }

    updateNumeric(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: this.validateNumericInput(event.currentTarget.value)
        });
    }

    updatePersonal() {
         this.props.mutate({
             variables: { 
                 id: this.props.id, 
                 lastName: this.state.last, 
                 firstName: this.state.first, 
                 age: parseInt(this.state.age) 
                },
             refetchQueries: [{ query: currentUser }]
         }).then(
             this.props.finishEdit("Personal")
         );
    }

    validateNumericInput(input) {
        if (input < 0 || isNaN(input)) {
            return false;
        }
        return true;
    }

    validateTextInput(input) {
        const testForSpecial = new RegExp(/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g);
        const testForNumber = new RegExp(/[0-9]/);
        if (testForNumber.test(input) || testForSpecial.test(input)) {
            return false
        }
        return true;
    }

    allFieldsValid() {
        if (!this.state.lastValid || !this.state.firstValid || !this.state.ageValid) {
            return false;
        }
           return true;
    }

    render() {
        const allFieldsValid = this.allFieldsValid();
        return (
            <div className="edit-pane">
                <div className="edit-multi-field">
                    <span style={{"position":"relative", "fontWeight":"bold"}}>First Name:{' '}
                      <input className="edit-pane-text-input" onChange={this.updateText('first')} value={this.state.first}/>
                        {!this.state.firstValid && <span className="error-message" style={{ "margin-right": "-4rem" }}>Name may only have letters</span>}
                    </span>
                    <span style={{"fontWeight":"bold"}}>Last Name:{' '}
                      <input className="edit-pane-text-input" onChange={this.updateText('last')} value={this.state.last}/>
                        {!this.state.lastValid && <span className="error-message" style={{ "margin-right": "-4rem" }}>Name may only have letters</span>}
                    </span>
                    <span style={{ "fontWeight": "bold" }}>Age:{' '}
                    <input className="edit-pane-text-input" onChange={this.updateNumeric('age')} value={this.state.age}/>
                        {!this.state.ageValid && <span className="error-message" style={{"margin-right": "-4rem"}}>Age must be a positive number</span>}
                    </span>
                </div>
                <div className="edit-btn-container">
                    <button className="edit-btn"onClick={this.updatePersonal} disabled={!allFieldsValid}>SAVE</button>
                    <button className="edit-btn-reverse" onClick={this.props.cancelEdit} name="Personal">CANCEL</button>
                </div>
            </div>
        );
    }
}
const mutation = gql`
mutation  updatePersonal($id: String!, $firstName: String!, $lastName: String!, $age: Int!) {
  updatePersonal(id: $id, age: $age, lastName: $lastName, firstName: $firstName) {
    id
    lastName
    firstName
    age
  }
}
`;

export default graphql(mutation)(EditPersonal)