//************************************************/
//  Format numbers with commas using regEdit     /
//************************************************/
import React from "react";

function NumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default NumberWithCommas;
