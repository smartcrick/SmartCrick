import React, { useState } from "react";
import API from "../../api/api";

const GoalForm = ({ next }) => {
  const [goal, setGoal] = useState({
    goal_type: "batting",
    improvement_area: "",
  });

  const submit = async () => {
    await API.post("goals/", goal);
    next();
  };

  return (
    <div>
      <input
        placeholder="Improvement Area (e.g., Short Ball)"
        onChange={(e) =>
          setGoal({ ...goal, improvement_area: e.target.value })
        }
      />
      <button onClick={submit}>Next</button>
    </div>
  );
};

export default GoalForm;