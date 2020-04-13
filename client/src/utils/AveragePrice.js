import React from "react";

//###################################################/
  //  Following function calculates the average price */
  //###################################################/
  const AveragePrice= list => {
    let sum = 0;
    for( let i = 0; i < list.length; i++ ){
        sum += parseInt( list[i], 10 ); //don't forget to add the base
    }
    
    return sum/list.length;
  }

export default AveragePrice;