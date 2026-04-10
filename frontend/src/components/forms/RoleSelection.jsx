import React from "react";

const RoleSelection = ({ setRole, next }) => {
  return (
    <div>
      <h2>Select Role</h2>
      <button onClick={() => { setRole("batter"); next(); }}>Batter</button>
      <button onClick={() => { setRole("bowler"); next(); }}>Bowler</button>
      <button onClick={() => { setRole("allrounder"); next(); }}>All-Rounder</button>
    </div>
  );
};

export default RoleSelection;