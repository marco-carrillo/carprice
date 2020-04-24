import React from "react";

const DisplayError=() =>{
    return(
        <div className="jumbotron jumbotron-fluid header xbg-info xtext-white my-2 pt-3 pb-1">
            <h4 className="text-center">No results today.....  It could be due to one of the following</h4>
            <ul className="text-center">1.  Invalid VIN</ul>
            <ul className="text-center">2.  Invalid ZIP Code</ul>
            <ul className="text-center">3.  No inventory found nationwide</ul>
        </div>
    )
}

export default DisplayError;