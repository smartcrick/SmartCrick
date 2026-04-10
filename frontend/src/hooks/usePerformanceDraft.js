import { useRef, useState } from "react";

export const createInitialPerformanceDraft = () => ({
  role: "",
  session_type: "",
  date: "",
  opponent: "",
  venue: "",
  runs: "",
  balls: "",
  overs: "",
  wickets: "",
  goal_type: "batting",
  improvement_area: "",
  video: null,
});

export function usePerformanceDraft(initialDraft = createInitialPerformanceDraft()) {
  const baselineDraft = useRef({ ...initialDraft });
  const [draft, setDraft] = useState(() => ({ ...baselineDraft.current }));

  return {
    draft,
    updateField(name, value) {
      setDraft((current) => ({ ...current, [name]: value }));
    },
    patchDraft(patch) {
      setDraft((current) => ({ ...current, ...patch }));
    },
    resetDraft() {
      setDraft({ ...baselineDraft.current });
    },
  };
}
