import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getStepErrors, usePerformanceWizard } from "../usePerformanceWizard";

describe("usePerformanceWizard", () => {
  it("starts on welcome and advances through the guided sequence", () => {
    const { result } = renderHook(() => usePerformanceWizard());

    expect(result.current.currentStep.key).toBe("welcome");

    act(() => result.current.start());
    expect(result.current.currentStep.key).toBe("role");

    act(() => result.current.goNext());
    expect(result.current.currentStep.key).toBe("session");
  });

  it("returns step-specific validation errors for the draft state", () => {
    expect(getStepErrors("role", {})).toEqual({
      role: "Select a role to continue.",
    });

    expect(getStepErrors("session", { role: "batter" })).toEqual({
      session_type: "Select a session type to continue.",
    });

    expect(
      getStepErrors("details", {
        role: "allrounder",
        session_type: "match",
      }),
    ).toEqual({
      date: "Date is required.",
      opponent: "Opponent is required.",
      venue: "Venue is required.",
      runs: "Runs are required.",
      balls: "Balls are required.",
      overs: "Overs are required.",
      wickets: "Wickets are required.",
    });

    expect(getStepErrors("goal", {})).toEqual({
      improvement_area: "Add a focus area to continue.",
    });
  });

  it("allows zero-like numeric values and role-based field omissions in details", () => {
    expect(
      getStepErrors("details", {
        role: "allrounder",
        session_type: "training",
        date: "2026-04-11",
        runs: 0,
        balls: "0",
        overs: 0,
        wickets: "0",
      }),
    ).toEqual({});
  });

  it("lets batter drafts omit bowling fields, bowler drafts omit batting fields, and non-match sessions omit opponent and venue", () => {
    expect(
      getStepErrors("details", {
        role: "batter",
        session_type: "training",
        date: "2026-04-11",
        runs: "42",
        balls: "30",
      }),
    ).toEqual({});

    expect(
      getStepErrors("details", {
        role: "bowler",
        session_type: "training",
        date: "2026-04-11",
        overs: "4",
        wickets: "2",
      }),
    ).toEqual({});

    expect(
      getStepErrors("details", {
        role: "batter",
        session_type: "training",
        date: "2026-04-11",
        runs: "61",
        balls: "45",
      }),
    ).not.toHaveProperty("opponent");

    expect(
      getStepErrors("details", {
        role: "batter",
        session_type: "training",
        date: "2026-04-11",
        runs: "61",
        balls: "45",
      }),
    ).not.toHaveProperty("venue");
  });
});
