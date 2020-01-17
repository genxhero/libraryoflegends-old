/**
 * Problem: Every number apart from 1, 2, and 3 ends in "th" when talking about order of sequence.
 * Solution: Create a helper function that 
 * This particular version only works on numbers between one and twenty.
 * TODO: Refactor to work with numbers higher than 20
 */

export  const numberSuffix = (num) => {
    switch (num){
       case 1:
       return "st";
       case 2: 
       return "nd";
       case 3: 
       return "rd";
       default: 
       return "th";
    }
 }

 /**
  * It's not a perfect sequential check, as "abcdefk" will still return sequential.  
  * Will refactor later. I am sure there is some simple formula involving the ORD I need to use.
  */
 export const isSequential = (string) => {
     for (let index = 0; index < string.length; index++) {
         if (string[index] > string[index+ 1]) {
             return false
         }
     }
     return true
 }

 /**
  * Checks for any repetitious characters, returning true if it finds 3 or more of the same character in a row.
  */
 export const hasTooManyRepeats = (string) => {
    let repeats = 0;
     for (let index = 0; index < string.length; index++){
         if (string[index] === string[index + 1]){
            repeats += 1;
            if (repeats === 3) {
                return true;
            }
         } else {
             repeats = 0;
         }

     }
     return false;
 }

 export const capitalize = (string) => {
     const first = string.slice(0, 1).toUpperCase();
     const rest = string.slice(1);
     return first + rest;
 }