import React from "react";
import NumberWithCommas from "../../utils/NumbersWithCommas"

const ResultsStats=(props)=>{
    return(
        <div className="jumbotron jumbotron-fluid bg-info text-white my-2 pt-3 pb-1">
            <h4 className="text-center">{props.title}</h4>
            <div className="row">
                <div className="col-md-4">
                  <h5 className="text-center"># of cars={NumberWithCommas(props.nbr)}</h5>
                </div>
                <div className="col-md-4">
                    <h5 className="text-center">Median price=${NumberWithCommas(props.med)}</h5>
                </div>
                <div className="col-md-4">
                    <h5 className="text-center">Average price=${NumberWithCommas(props.avg)}</h5>
                </div>
            </div>
        </div>
    )
}

export default ResultsStats;