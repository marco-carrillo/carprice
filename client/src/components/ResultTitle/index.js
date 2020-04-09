import React from "react";

function SearchBox({ children }) {
  return (
    <div
      style={{ height: 10, clear: "both", paddingTop: 15, textAlign: "center" }}
      className="jumbotron bg-info text-white mt-0 mb-1 pb-5"
    >
      {children}
    </div>
  );
}

export default SearchBox;
