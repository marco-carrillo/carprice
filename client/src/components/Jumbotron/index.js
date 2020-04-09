import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 80, clear: "both", paddingTop: 5, paddingBottom:5, textAlign: "center" }}
      className="jumbotron bg-info text-white mb-2"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
