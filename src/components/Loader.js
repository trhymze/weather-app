import React from "react";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
