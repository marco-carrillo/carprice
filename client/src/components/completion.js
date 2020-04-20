import React from "react";

const Completion=(props) =>{

    let percentage=props.progress+"%";
    const styles={width: percentage}

    return(
        <div className="progress">
            <div className="progress-bar" style={styles} role="progressbar" aria-valuenow={props.progress} aria-valuemin="0" aria-valuemax="100">{props.progress}%</div>
        </div>
    )
}

export default Completion;