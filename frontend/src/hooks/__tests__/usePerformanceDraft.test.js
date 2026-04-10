import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createInitialPerformanceDraft, usePerformanceDraft } from "../usePerformanceDraft";

describe("usePerformanceDraft", () => {
  it("exposes the canonical initial draft shape", () => {
    expect(createInitialPerformanceDraft()).toEqual({
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
  });

  it("updates shared, role, and session-aware fields in one normalized object", () => {
    const { result } = renderHook(() => usePerformanceDraft());

    act(() => {
      result.current.updateField("role", "allrounder");
      result.current.updateField("session_type", "match");
      result.current.updateField("runs", "48");
      result.current.updateField("overs", "4");
      result.current.updateField("venue", "National Stadium");
    });

    expect(result.current.draft).toMatchObject({
      role: "allrounder",
      session_type: "match",
      runs: "48",
      overs: "4",
      venue: "National Stadium",
    });
  });

  it("patches and resets to the seeded baseline", () => {
    const seededDraft = {
      ...createInitialPerformanceDraft(),
      role: "batter",
      session_type: "training",
      venue: "Old Trafford",
    };

    const { result } = renderHook(() => usePerformanceDraft(seededDraft));

    act(() => {
      result.current.patchDraft({
        runs: "64",
        wickets: "2",
      });
    });

    expect(result.current.draft).toMatchObject({
      role: "batter",
      session_type: "training",
      venue: "Old Trafford",
      runs: "64",
      wickets: "2",
    });

    act(() => {
      result.current.resetDraft();
    });

    expect(result.current.draft).toEqual(seededDraft);
  });
});
