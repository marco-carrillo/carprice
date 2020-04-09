import React from "react";

function SearchBox({ children }) {
  return (
    <div
      style={{ height: 150, clear: "both", paddingTop: 5, textAlign: "center" }}
      className="jumbotron bg-primary mt-0 mb-2"
    >
      {children}
    </div>
  );
}

export default SearchBox;
