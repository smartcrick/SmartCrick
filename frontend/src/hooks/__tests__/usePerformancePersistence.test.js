import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../api/axiosClient", () => ({
  default: {
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

import axiosClient from "../../api/axiosClient";
import { createPerformancePersistence, usePerformancePersistence } from "../usePerformancePersistence";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createPerformancePersistence", () => {
  it("creates a performance record once and patches it afterward", async () => {
    axiosClient.post.mockResolvedValueOnce({ data: { id: 17 } });
    axiosClient.patch.mockResolvedValueOnce({ data: { id: 17, runs: 45 } });

    const api = createPerformancePersistence();
    const firstId = await api.savePerformanceDetails({ role: "batter", session_type: "match" });
    const secondId = await api.savePerformanceDetails({ runs: 45 }, 17);

    expect(firstId).toBe(17);
    expect(secondId).toBe(17);
    expect(axiosClient.post).toHaveBeenCalledTimes(1);
    expect(axiosClient.patch).toHaveBeenCalledTimes(1);
    expect(axiosClient.post).toHaveBeenCalledWith("/api/performance/", { role: "batter", session_type: "match" });
    expect(axiosClient.patch).toHaveBeenCalledWith("/api/performance/17/", { runs: 45 });
  });

  it("throws when patch is unavailable for an existing performance record", async () => {
    const client = {
      post: vi.fn(),
    };

    const api = createPerformancePersistence(client);
    await expect(api.savePerformanceDetails({ runs: 45 }, 17)).rejects.toThrow(
      "Cannot update an existing performance record because PATCH is unavailable.",
    );

    expect(client.post).not.toHaveBeenCalled();
  });

  it("merges performance context into goal saves when provided", async () => {
    const client = {
      post: vi.fn().mockResolvedValueOnce({ data: { id: 9 } }),
    };

    const api = createPerformancePersistence(client);
    await api.saveGoal({ goal_type: "batting", improvement_area: "Short ball" }, 17);

    expect(client.post).toHaveBeenCalledWith("/api/goals/", {
      goal_type: "batting",
      improvement_area: "Short ball",
      performance: 17,
    });
  });
});

describe("usePerformancePersistence", () => {
  it("tracks saving state and clears the error on success", async () => {
    let resolvePost;
    const postPromise = new Promise((resolve) => {
      resolvePost = resolve;
    });
    const client = {
      post: vi.fn().mockReturnValueOnce(postPromise),
      patch: vi.fn(),
    };

    const { result } = renderHook(() => usePerformancePersistence(client));

    let pending;
    act(() => {
      pending = result.current.saveGoal({ goal_type: "batting" });
    });

    expect(result.current.isSaving).toBe(true);

    resolvePost({ data: { id: 5 } });

    await act(async () => {
      await pending;
    });

    await waitFor(() => {
      expect(result.current.isSaving).toBe(false);
      expect(result.current.error).toBe("");
    });

    expect(client.post).toHaveBeenCalledWith("/api/goals/", { goal_type: "batting" });
  });

  it("passes performance context through saveGoal", async () => {
    const client = {
      post: vi.fn().mockResolvedValueOnce({ data: { id: 5 } }),
      patch: vi.fn(),
    };

    const { result } = renderHook(() => usePerformancePersistence(client));

    await act(async () => {
      await result.current.saveGoal({ goal_type: "batting" }, 17);
    });

    expect(client.post).toHaveBeenCalledWith("/api/goals/", {
      goal_type: "batting",
      performance: 17,
    });
  });

  it("extracts server error details and exposes them through the hook", async () => {
    const client = {
      post: vi.fn().mockRejectedValueOnce({
        response: { data: { detail: "Backend said no." } },
      }),
      patch: vi.fn(),
    };

    const { result } = renderHook(() => usePerformancePersistence(client));

    await act(async () => {
      await expect(result.current.saveGoal({ goal_type: "batting" })).rejects.toMatchObject({
        response: { data: { detail: "Backend said no." } },
      });
    });

    await waitFor(() => {
      expect(result.current.isSaving).toBe(false);
      expect(result.current.error).toBe("Backend said no.");
    });
  });
});
