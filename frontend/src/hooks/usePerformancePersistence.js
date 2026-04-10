import { useMemo, useState } from "react";

import axiosClient from "../api/axiosClient";

export function createPerformancePersistence(client = axiosClient) {
  return {
    async savePerformanceDetails(payload, performanceId = null) {
      if (!performanceId) {
        const response = await client.post("/api/performance/", payload);
        return response.data.id;
      }

      if (typeof client.patch === "function") {
        const response = await client.patch(`/api/performance/${performanceId}/`, payload);
        return response.data.id ?? performanceId;
      }

      throw new Error("Cannot update an existing performance record because PATCH is unavailable.");
    },
    async saveGoal(payload, performanceId = null) {
      const requestPayload =
        performanceId == null ? payload : { ...payload, performance: performanceId };
      const response = await client.post("/api/goals/", requestPayload);
      return response.data;
    },
    async uploadVideo(performanceId, video) {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("performance", performanceId);

      const response = await client.post("/api/videos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
  };
}

export function usePerformancePersistence(client = axiosClient) {
  const api = useMemo(() => createPerformancePersistence(client), [client]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function run(action) {
    setIsSaving(true);
    setError("");
    try {
      return await action();
    } catch (caught) {
      setError(caught?.response?.data?.detail ?? "We could not save your progress. Please try again.");
      throw caught;
    } finally {
      setIsSaving(false);
    }
  }

  return {
    isSaving,
    error,
    clearError: () => setError(""),
    savePerformanceDetails: (payload, performanceId) => run(() => api.savePerformanceDetails(payload, performanceId)),
    saveGoal: (payload, performanceId) => run(() => api.saveGoal(payload, performanceId)),
    uploadVideo: (performanceId, video) => run(() => api.uploadVideo(performanceId, video)),
  };
}
