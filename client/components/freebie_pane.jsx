import React, { Component } from 'react'
import { throws } from 'assert';

export default class FreebiePane extends Component {

   constructor(props){
      super(props)
      this.state = {
        freebs: [],
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      }
     this.changeSelection = this.changeSelection.bind(this);
     this.passTheProps = this.passTheProps.bind(this);
   }

  passTheProps(event){
    event.preventDefault();
    const newState = this.state;
    for (let i = 0; i < newState.freebs.length; i++) {
      newState[newState.freebs[i]] = 2;
    }
    this.props.nextPane(newState)
  }

  changeSelection(event) {
    let newArr = this.state.freebs;
    if (event.target.checked) {
      newArr.push(event.target.value)
    }
    else {
      newArr.splice(newArr.indexOf(event.target.value), 1)
    }
    this.setState({
      freebs: newArr
    })
  }

  render() {
    return (      
  <div className="char-creation-pane">
      <form className="freebie-form" onChange={this.changeSelection} onSubmit={this.passTheProps}>  
         <p>Now, please select four ability scores that will each receive a +2 boost</p>
        <div className="freebie-choices">
          <label className="pure-checkbox" >
            <input type="checkbox" name="freebie-checkbox" value="strength" disabled={this.state.freebs.length === 4 && !this.state.freebs.includes("strength")} /> Strength
                  </label>
          <label className="pure-checkbox">
            <input type="checkbox" name="freebie-checkbox" value="dexterity" disabled={this.state.freebs.length === 4 && !this.state.freebs.includes("dexterity")} /> Dexterity
                  </label>
          <label className="pure-checkbox">
            <input type="checkbox" name="freebie-checkbox" value="constitution" disabled={this.state.freebs.length === 4 && !this.state.freebs.includes("constitution")} /> Constitution
                  </label>
          <label className="pure-checkbox">
            <input type="checkbox" name="freebie-checkbox" value="intelligence" disabled={this.state.freebs.length === 4 && !this.state.freebs.includes("intelligence")} /> Intelligence
                  </label>
          <label className="pure-checkbox">
            <input type="checkbox" name="freebie-checkbox" value="wisdom" disabled={this.state.freebs.length === 4 && !this.state.freebs.includes("wisdom")} /> Wisdom
                  </label>
          <label className="pure-checkbox">
            <input type="checkbox" name="freebie-checkbox" value="charisma" disabled={this.state.freebs.length === 4 && !this.state.freebs.includes("charisma")} /> Charisma
                  </label>
        </div>
          <input type="submit" className="submit" value="Next" disabled={this.state.freebs.length < 4}></input>
      </form>
  </div>
    )
  }
}
