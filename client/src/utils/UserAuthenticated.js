import React from "react";
import axios from "axios";

async function UserAuthenticated() {
    let res= await axios.get("/authenticated");

    return res.data;
}

export default UserAuthenticated;