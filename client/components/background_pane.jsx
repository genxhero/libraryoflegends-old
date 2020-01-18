import React, { Component } from 'react'
import Backgrounds from './backgrounds';

class BackgroundPane extends Component {
    constructor(props) {
        super(props);
        this.backgrounds = Backgrounds;
        this.passTheProps = this.passTheProps.bind(this);
        this.firstChoice = this.firstChoice.bind(this);
        this.describeMeMaybe = this.describeMeMaybe.bind(this);
        this.titleMaybe = this.titleMaybe.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.secondChoice = this.secondChoice.bind(this);
        this.state = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }

    titleMaybe(){
        if (this.state.background) {
            return (<h1>{this.state.background.name}</h1>);
        }  else {
            return (<h1>Background</h1>
              )
        }
    }

    firstChoice(event){
        // debugger;
       if (this.state.chosen === true) {

        return (
            <div className="select-wrapper">
            <select className="freebie-selector" name="background-freebs-first">
                     <option value="blank"></option>
                     <option value={this.state.background.mustHaves[0]}>{this.state.background.mustHaves[0]}</option>
                     <option value={this.state.background.mustHaves[1]}>{this.state.background.mustHaves[1]}</option>
                 </select>
        </div>);

       } else {
           return <div>
           </div>
       }
    }

    secondChoice(event){
        // debugger;
        if (this.state.firstPicked === true) {
            const stats = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

            return (
            <div className="select-wrapper">
                <select className="freebie-selector" name="background-freebs-second">
                         <option value="blank"></option>
                         {
                             stats.map( (score) => {
                                 if (score != this.state.firstFreeb ){
                                    return (<option className="be-capitalized"key={`${score}69`}value={score}>{score}</option>);
                                 }
                             })
                         }

                     </select>
            </div>);
    
           } else {
               return <div>
               </div>
           }
    }

    passTheProps(event){
        event.preventDefault();
        const newState = this.state;
        // debugger;
        newState[newState.firstFreeb[0]] = 2;
        newState[newState.secondFreeb[0]] = 2;
        this.props.nextPane(newState);
    }

    handleChange(event){
        // debugger;
        switch (event.target.name){
            case "background":
            if (event.target.value === "blank") {
                this.setState({
                    chosen: false,
                    firstPicked: false,
                    background: null,
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0
                });
            } else {
                 this.setState({
                background: this.backgrounds[event.target.value.toLowerCase().replace(/\s/g, '')],
                chosen: true,
                strength: 0,
                dexterity: 0,
                constitution: 0,
                intelligence: 0,
                wisdom: 0,
                charisma: 0
            });
            }
           
            break;
            case "background-freebs-first":
               this.setState({
                   firstPicked: true,
                   secondPicked: false,
                   secondFreeb: "",
                   firstFreeb: [event.target.value]
               });
            break;
            case "background-freebs-second":
            this.setState({
                secondPicked: true,
                secondFreeb: [event.target.value]
            });
         break;

        }

    }

    describeMeMaybe(){
    //    debugger;
        if (this.state.background){
            return (
            <div className="background-description">
                <p>{this.state.background.description}</p>
                <p> Your days as a {this.state.background.name} have granted you a +2 bonus in two ability scores, one of which must be either {this.state.background.mustHaves[0]} or {this.state.background.mustHaves[1]}  </p>
             </div>
            );
        } else {
          return (
            <div className="background-placeholder">
               Desription of background will appear here upon selection.
            </div>
          );
        }
    }

    render() {
        // debugger;
        return (
            <div className="char-creation-pane">
            {this.titleMaybe()}
                <form onSubmit={this.passTheProps} onChange={this.handleChange}> 
                <label className="nonhuman-selector">
                  <span>Please Select One of The Following:{'  '}</span>
                 <select className="bg-selector" name="background">
                     <option value="blank"></option>
                     {
                       Object.values(this.backgrounds).map( (bg) => 
                       <option key={`${Date.now}${bg.name}42`}
                               value={`${bg.name}`}
                       >
                       {bg.name}
                       </option>
                       )
                       }
                  </select>
                </label>
              
                    {this.describeMeMaybe()}
                    <div style={{"display": "flex"}}>
                        {this.firstChoice()}
                        {this.secondChoice()}
                    </div>

                    <input type="submit" 
                           className="submit" 
                           value="NEXT" 
                        disabled={!this.state.secondPicked || !this.state.firstPicked}
                    />
                </form>
            </div>
        )
    }
}

export default BackgroundPane;