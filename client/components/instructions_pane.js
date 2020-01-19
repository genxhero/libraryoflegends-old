import React from 'react';

const InstructionsPane = (props) => {
    return (
       <div className="char-creation-pane">
           <h3 className="pane-title">How To Use</h3>
           <p>Character generation follows the <a href ="">Pathfinder 2nd Edition</a> RPG rule set.  Unlike previous incarnations
           of the d20-based role playing game where you get all of your ability scores all at once, in this system your ability scores
           are generated based on a number of choices made in succession.</p>
           <ol>
               <li>Enter personal information (name, age, and a short biography)</li>
               <li>Choose ancestry (elf, human, dwarf, halfling, etc).  Each ancestry will modify your ability scores, usually a bonus to two of them</li>
               <li>Choose Background (blacksmith, acrobat, etc). You will gain a bonus to two ability scores, one of which must be intrinsically tied to the background</li>
               <li>Choose Class (Fighter, Rogue, etc).  Each class has a "key" ability score </li>
               <li>Upload an Image: Self explanatory</li>
               <li>Hit Submit and if all goes well you'll see your character on the index page</li>
           </ol>
           <button className="submit" onClick={props.nextPane}>NEXT</button>
        </div>
   )
}

export default InstructionsPane