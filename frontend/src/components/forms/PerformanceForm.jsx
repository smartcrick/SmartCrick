import React, { useState } from "react";
import API from "../../api/api";

const PerformanceForm = ({ role, sessionType, next }) => {
  const [data, setData] = useState({
    role,
    session_type: sessionType,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const res = await API.post("performance/", data);
    next(res.data.id);
  };

  return (
    <div>
      <input type="date" name="date" onChange={handleChange} />

      {sessionType === "match" && (
        <>
          <input name="opponent" placeholder="Opponent" onChange={handleChange} />
          <input name="venue" placeholder="Venue" onChange={handleChange} />
        </>
      )}

      {role !== "bowler" && (
        <>
          <input name="runs" placeholder="Runs" onChange={handleChange} />
          <input name="balls" placeholder="Balls" onChange={handleChange} />
        </>
      )}

      {role !== "batter" && (
        <>
          <input name="overs" placeholder="Overs" onChange={handleChange} />
          <input name="wickets" placeholder="Wickets" onChange={handleChange} />
        </>
      )}

      <button onClick={submit}>Next</button>
    </div>
  );
};

export default PerformanceForm;