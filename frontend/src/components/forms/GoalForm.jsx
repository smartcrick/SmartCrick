import { useState } from "react";

import { usePerformancePersistence } from "../../hooks/usePerformancePersistence";

const GoalForm = ({ next, performanceId = null }) => {
  const { saveGoal, isSaving, error } = usePerformancePersistence();
  const [goal, setGoal] = useState({
    goal_type: "batting",
    improvement_area: "",
  });

  const submit = async () => {
    await saveGoal(goal, performanceId);
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
      {error && <p>{error}</p>}
      <button onClick={submit} disabled={isSaving}>
        {isSaving ? "Saving..." : "Next"}
      </button>
    </div>
  );
};

export default GoalForm;
