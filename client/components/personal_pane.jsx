import React, { Component } from 'react'

class PersonalPane extends Component {
    constructor(props){
        super(props);
        this.state = {
             firstName: "",
             lastName:"",
             bio: "",
             gender: "Male",
             age: 0,
             ageValid: null,
             firstNameValid: null,
             lastNameValid: null
        }
        this.updateNumeric = this.updateNumeric.bind(this);
        this.updateText = this.updateText.bind(this);
        this.passTheProps = this.passTheProps.bind(this)
        this.validateNumericInput = this.validateNumericInput.bind(this);
        this.validateTextInput = this.validateTextInput.bind(this);
        this.allValid = this.allValid.bind(this);
    }
    
    /**
     * We always want our bio field to be valid, we don't want numbers or special characters in our 
     * character names. 
     */
    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: field === "bio" ? true : this.validateTextInput(event.currentTarget.value)
        });
    }

    updateNumeric(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: this.validateNumericInput(event.currentTarget.value)
        });
    }

    passTheProps(){
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    validateNumericInput(input) {
        if (input < 0 || isNaN(input)) {
            return false;
        } 
        return true;
    }

    validateTextInput(input) {
        //Lordy, regular expressions are terrible
        const testForSpecial = new RegExp(/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g);
        const testForNumber = new RegExp(/[0-9]/);
        if (testForNumber.test(input) || testForSpecial.test(input)) {
            return false
        }
        return true;
    }

    allValid(){
        if (!this.state.ageValid || !this.state.firstNameValid || !this.state.lastNameValid ) {
          return false
        }
        return true;
    }

    render (){ 
     const submitEnabled = this.allValid();
        const creationErrorStyle = { "right": "20.5rem", "top":"1.75rem"}
     return (
         <div className="char-creation-pane">

            <form className="char-form" onSubmit={this.passTheProps}>
            <div className="char-form-row">   
              <div className="char-form-col"> 
                 <label className="personal-input">
                    <span className="label-content">First Name</span>
                    <input className="char-field-long"
                        value={this.state.firstName}
                        placeholder=""
                        type="text"
                        onChange={this.updateText('firstName')}
                    ></input>
                             {this.state.firstNameValid === false && <span className="error-message" style={creationErrorStyle}>Only letters and dashes</span>}
                 </label>
                 <label className="personal-input">
                 <span className="label-content">Last Name</span>
                    <input className="char-field-long"
                        value={this.state.lastName}
                        placeholder=""
                        type="text"
                        onChange={this.updateText('lastName')}
                    ></input>
                             {this.state.lastNameValid === false && <span className="error-message" style={creationErrorStyle}>Only letters and dashes</span>}
                 </label>
              
                 <span className="personal-input">
                             {this.state.ageValid === false && <span className="error-message" style={creationErrorStyle}>Age must be a positive number</span>}
                   <span className="label-content">Age</span>
                   <input className="char-field-short"
                        value={this.state.age}
                        placeholder=""
                        type="text"
                        onChange={this.updateNumeric('age')}  
                    ></input>
                 </span>
                </div>
                
                 <div className="char-form-col"> 
                     <label className="personal-input">Biography</label>
                     <textarea className="char-bio-input"
                         value={this.state.bio}
                         placeholder=""
                         type="text"
                         onChange={this.updateText('bio')}
                     ></textarea>
                 </div>
                </div>
                 <input type="submit" className="submit" value="NEXT" disabled={!submitEnabled}></input>
            </form>
        </div>
    )
  }
}

export default PersonalPane