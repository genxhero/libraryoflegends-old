import React, { Component } from 'react';
import Classes from './classes';

class ClassPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            selected: null
        }
        this.classes = Classes;
        this.selectClass = this.selectClass.bind(this);
        this.passTheProps = this.passTheProps.bind(this);
        this.showDescription = this.showDescription.bind(this);
        this.choiceMaybe = this.choiceMaybe.bind(this);
        this.enableNextButton = this.enableNextButton.bind(this);
        this.chooseFreebie = this.chooseFreebie.bind(this);
    }

    passTheProps(){
        event.preventDefault();
        const newState = this.state;
        if (newState.selected.name === "fighter" || newState.selected.name === "rogue" || newState.selected.name === "monk"){
             newState[this.state.chosen] = 2;
        } else {
            newState[this.state.selected.keyAbility] = 2;
        }
        this.props.nextPane(newState);
    }

    choiceMaybe(){ 
     if( !this.state.selected) {
         return <div />
     }   
     if (this.state.selected.name === "fighter" || this.state.selected.name === "monk" || this.state.selected.name === "rogue") {
            return (
                <label className="nonhuman-selector"> 
                   <span>Strong or Agile, your choice: </span>
                    <select className="freebie-selector">
                        <option value=""></option>
                        <option className="be-capitalized" value={this.state.selected.keyAbility[0]}>{this.state.selected.keyAbility[0]}</option>
                        <option className="be-capitalized" value={this.state.selected.keyAbility[1]}>{this.state.selected.keyAbility[1]}</option>
                  </select>
                </label>
            );
        } else {
           return (
             <div/> 
           )
        }
    }

    chooseFreebie(event){
        event.preventDefault();
        this.setState({
            freebChosen: event.target.value !== "" ? true : false,
            chosen: event.target.value
        })
    }

    enableNextButton(){
        //Check to see if a class has been chosen
        //Then check to see if it is one of 3 edge cases
        //If it's not a bloody edge case, return the submit button.
        //If it is, check to see whether the selection for the two things has been made.
        if (this.state.selected != null){
            if (this.state.selected.name === "fighter" || this.state.selected.name === "monk" || this.state.selected.name === "rogue"){
                if (this.state.freebChosen === true){
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    showDescription(){
        if (this.state.selected === null) {
            return( <div className="class-description">
                <p>When you have selected your character's class, a description will appear right here</p>
            </div>)
        } else {
            const edgeCases = (this.state.selected.name === "fighter" || this.state.selected.name === "monk" || this.state.selected.name === "rogue")
            return (
                <div className="class-description">
                  <p>{this.state.selected.description}</p>
                     {edgeCases && <span>A {this.state.selected.name} gain a +2 to their {this.state.selected.keyAbility[0]} or {this.state.selected.keyAbility[1]}</span>}
                     {!edgeCases && <span>A {this.state.selected.name} gain a +2 bonus to their {this.state.selected.keyAbility} score.</span>}
                </div>
            );
        }
    }

    selectClass(event){
        event.preventDefault();
        this.setState({ selected: this.classes[parseInt(event.target.id)] })
    }

  

    render() {
        const left = this.classes.slice(0, 4);
        const middle = this.classes.slice(4, 8)
        const right = this.classes.slice(8);
        const nextEnabled = this.enableNextButton();
        return (
        <div className="char-creation-pane"> 
           <h1 className="pane-title">Character Class</h1>
           <div className="class-list">
            <div className="class-list-column">
                {left.map(charClass => (
                    <div className={this.state.selected === charClass ? "class-selected" : "class-selector"} 
                         key={`${Date.now}${charClass.name}420`} 
                         onClick={this.selectClass} 
                         id={this.classes.indexOf(charClass)}>
                        {charClass.name.toUpperCase()}
                    </div>
                ))}
            </div>
            <div className="class-list-column">
                        {middle.map(charClass => (
                            <div className={this.state.selected === charClass ? "class-selected" : "class-selector"}
                                key={`${Date.now}${charClass.name}420`}
                                onClick={this.selectClass}
                                id={this.classes.indexOf(charClass)}>
                                {charClass.name.toUpperCase()}
                            </div>
                        ))}
            </div>
            <div className="class-list-column">
                    {right.map(charClass => (
                        <div className={this.state.selected === charClass ? "class-selected" : "class-selector"}
                            key={`${Date.now}${charClass.name}420`}
                            onClick={this.selectClass}
                            id={this.classes.indexOf(charClass)}>
                            {charClass.name.toUpperCase()}
                        </div>
                    ))}
            </div>
        </div>
        <form onChange={this.chooseFreebie} onSubmit={this.passTheProps}>
            <div className="description">
                {this.showDescription()}
            </div>
            {this.choiceMaybe()}
            <input type="submit" className="submit" value="NEXT" disabled={!nextEnabled}/>
            </form>
          </div>);
    }
}

export default ClassPane;