import React from "react";
import NumberWithCommas from "../../utils/NumbersWithCommas"

const LocalResultsStats=(props)=>{
    return(
        <div className="jumbotron jumbotron-fluid bg-info text-white my-2 pt-3 pb-1">
            <h3 className="text-center"> {props.title} (cars within +/- {props.range} miles within 150 miles)</h3>
            <div className="row">
                <div className="col-md-4">
                  <h5 className="text-center"># of local cars={NumberWithCommas(props.nbr)}</h5>
                </div>
                <div className="col-md-4">
                    <h5 className="text-center">Median local price=${NumberWithCommas(props.med)}</h5>
                </div>
                <div className="col-md-4">
                    <h5 className="text-center">Average local price=${NumberWithCommas(props.avg)}</h5>
                </div>
            </div>
        </div>
    )
}

export default LocalResultsStats;