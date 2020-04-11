import React from "react";

const LocalResultsData=(props)=>{
    return(
        <div className="jumbotron jumbotron-fluid bg-info text-white my-2 pt-3 pb-1">
            <h3 className="text-center">Quick statistics for local cars (cars within +/- {props.range} miles within 150 miles</h3>
            <div className="row">
                <div className="col-md-4">
                  <h5 className="text-center"># of local cars={props.nbr}</h5>
                </div>
                <div className="col-md-4">
                    <h5 className="text-center">Median local price={props.med}</h5>
                </div>
                <div className="col-md-4">
                    <h5 className="text-center">Average local price={props.avg}</h5>
                </div>
            </div>
        </div>
    )
}

export default LocalResultsData;