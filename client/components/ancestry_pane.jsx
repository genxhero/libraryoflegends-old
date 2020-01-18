/**
 * Author: Aaron Goddard <aaronbear@gmail.com
 * 
 * This file contains a component where the user can select the ancestry of their character
 * 
 */

import React, { Component } from 'react'

class AncestryPane extends Component {
    constructor(props) {
        super(props);
        this.state ={
            strength:  0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            freebs: [],
        }
        this.displayChoices = this.displayChoices.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.passTheProps = this.passTheProps.bind(this);
        this.humanChoices = this.humanChoices.bind(this);
        this.halflingChoices = this.halflingChoices.bind(this);
        this.elfChoices = this.elfChoices.bind(this);
    }



    /**
     * Displays ability score bonus choices based on which race is selected.
     * Returns a div advising the user to make a choice if no selection has been made.
     */
    displayChoices(){
        switch (this.state.selected){
            default:
                return <div>
                    Please select an ancestry to continue
                    <div className="ancestry-placeholder">Ability Score Choices Will Appear Here</div>
                </div>;
            case "elf":
                return this.elfChoices();
                break;
            case "human":
                return this.humanChoices();
                break;
            case "dwarf":
                return this.dwarfChoices();
                break;
            case "halfling":
                return this.halflingChoices();
                break;
        }
    }

    /**
     * Kicks the new data back to the parent component.
     */
    passTheProps() {
        //please pass the props please
        event.preventDefault();
        const  newState = this.state;
        // TODO: Make all these into object.assign({}) etc
        for (let i = 0; i < newState.freebs.length; i++){
            newState[newState.freebs[i]] = 2;
        }

        switch (newState.selected){
            case "elf":
            newState["dexterity"] = 2;
            newState["intelligence"] = 2;
            newState["constitution"] = -2;
        }
        this.props.nextPane(newState);
    }

    /**
     * Handles all user input whether it is a checkbox or a select menu
     */
    changeSelection(event){
        if (event.target.name === "freebie-selector"){
            let newArr = [event.target.value];
                this.setState({
                    freebs: newArr
            });
            
          
        } else if (event.target.name === "freebie-checkbox") {
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
        } else {
            this.setState({
                selected: event.target.value,
                freebs: []
     //freebie points are reset in the event that ancestry should get changed
            });
        }
    }


    /**
     * Displays ancestry description and freebie point choices for elves
     */
    elfChoices(){
       return (
        <div className="freebie-choices">
            <div className="ancestry-info"> 
                <p>Fey and timeless, elves are highly intelligent and agile but slight of frame.</p>
                <p>+2 Dexterity, +2 Intelligence, -2 Constitution,
                    <span className="greenie"> +2 to one ability score of your choice </span>
                </p>
            </div>
           
         <label className="nonhuman-selector"> <span>Ability To Increase:</span>
            <select name="freebie-selector" className="freebie-selector">
                    <option className="freebie-option" value="blank"></option>
                    <option className="freebie-option" value="strength">Strength</option>
                    <option className="freebie-option" value="wisdom">Wisdom</option>
                    <option className="freebie-option"value="charisma">Charisma</option>
                </select>
                </label>
               <input type="submit" className="submit" value="Next" disabled={this.state.freebs.length < 1}></input>
        </div>
       );
    }

     /**
     * Displays ancestry description and freebie point choices for dwarves
     */
    dwarfChoices(){
        return (
            <div className="freebie-choices">
                <div className="ancestry-info"> 
                    <p>Sturdy and hard-headed, the dwarves are...well they're what you expect.</p>
                    <p>+2 Constitution, +2 Wisdom, -2 Charisma,
                        <span className="greenie"> +2 to one ability score of your choice </span>
                    </p>
                </div>
               
                <label className="nonhuman-selector"> <span>Ability To Increase:</span>
                  <select name="freebie-selector" className="freebie-selector">
                        <option className="freebie-option" value="blank"></option>
                        <option className="freebie-option" value="strength">Strength</option>
                        <option className="freebie-option" value="dexterity">Dexterity</option>
                        <option className="freebie-option" value="intelligence">Intelligence</option>
                    </select>
                    </label>
                <input type="submit" className="submit" value="Next" disabled={this.state.freebs.length < 1}></input>
            </div>
           );
    }

     /**
     * Displays ancestry description and freebie point choices for humans
     */
    humanChoices(){
        return (
            <div className="freebie-choices">
               <div className="ancestry-info"> 
                <p>Short-lived but alarmingly industrious, humans are also diverse in the extreme.</p>
                <p>+2 to two unique ability scores of your choice</p>
               </div>
              <div style={{"display":"flex", "justifyContent": "center", "margin":"1rem"}}>
                    <div className="freebie-checkboxes">
                        <label className="pure-checkbox" >
                        <input type="checkbox" name="freebie-checkbox" value="strength" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("strength")}/> Strength
                        </label>
                        <label className="pure-checkbox">
                        <input type="checkbox" name="freebie-checkbox" value="dexterity" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("dexterity")}/> Dexterity
                        </label>

                    </div>
                    <div className="freebie-checkboxes">
                        <label className="pure-checkbox">
                            <input type="checkbox" name="freebie-checkbox" value="constitution" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("constitution")} /> Constitution
                        </label>
                        <label className="pure-checkbox">
                        <input type="checkbox" name="freebie-checkbox" value="intelligence" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("intelligence")}/> Intelligence 
                        </label>
                    </div>
                    <div className="freebie-checkboxes">
                        <label className="pure-checkbox">
                          <input type="checkbox" name="freebie-checkbox" value="wisdom" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("wisdom")}/> Wisdom
                        </label>
                        <label className="pure-checkbox">
                          <input type="checkbox" name="freebie-checkbox" value="charisma" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("charisma")}/> Charisma
                        </label> 
                    </div>
                </div>
                <input type="submit" className="submit" value="Next" disabled={this.state.freebs.length < 2}></input>
            </div>
        );
    }

    halflingChoices(){
      //Dexterity and Charisma boost, plus one flexible boost; Strength flaw
        return (
            <div className="freebie-choices">
                <div className="ancestry-info">
                    <p>Half as tall as a human, halflings are agile and gregarious</p>
                    <p>+2 Dexterity, +2 Charisma, -2 Strength,
                        <span className="greenie"> +2 to one ability score of your choice </span>
                    </p>
                </div>

                <label className="nonhuman-selector"> <span>Ability To Increase:</span>
                    <select name="freebie-selector" className="freebie-selector">
                        <option className="freebie-option" value="blank"></option>
                        <option className="freebie-option" value="constitution">Constitution</option>
                        <option className="freebie-option" value="intelligence">Intelligence</option>
                        <option className="freebie-option" value="wisdom">Wisdom</option>
                    </select>
                </label>
                <input type="submit" className="submit" value="Next" disabled={this.state.freebs.length < 1}></input>
            </div>
        );
    }

    /**
     * It renders. What more do you want?
     */
    render() {
        return (
            <div className="char-creation-pane">
                  <h1 className="pane-title">Ancestry and Heritage</h1>
                  <form className="ancestry-choice"
                    onChange={this.changeSelection}
                    onSubmit={this.passTheProps}
                  >
                <div style={{"display":"flex"}}>
                    <label>
                        <input type="radio" value="human" checked={this.state.selected === 'human'}/>
                        Human
                    </label>
                    <label>
                        <input type="radio" value="elf" checked={this.state.selected === 'elf'}/>
                        Elf
                    </label>
                    <label>
                        <input type="radio" value="dwarf" checked={this.state.selected === 'dwarf'}/>
                        Dwarf
                    </label>
                    <label>
                        <input type="radio" value="halfling" checked={this.state.selected === 'halfling'} />
                        Halfling
                    </label>
                </div>
                    {this.displayChoices()}
                  </form>     
            </div>
        )
    }
}

export default AncestryPane;