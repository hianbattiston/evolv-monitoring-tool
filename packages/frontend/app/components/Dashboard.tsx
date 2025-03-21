"use client";

import { useState, useEffect, JSX } from "react";
import Header from "@/components/Header";
import MetricsPanel from "@/components/MetricsPanel";
import VisualizationSection from "@/components/VisualizationSection";
import EventLogPanel from "@/components/EventLogPanel";
import { useExperimentData } from "@/hooks/useExperimentData";
import MonitorIcon from "@/components/icons/MonitorIcon";

export default function Dashboard(): JSX.Element {
  const { experiments, logs, loading, error } = useExperimentData();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (experiments.length > 0) {
      setLastUpdated(new Date());
    }
  }, [experiments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading experiment data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const activeExperiment = experiments[0] || null;

  return (
    <div className="min-h-screen">
      <Header lastUpdated={lastUpdated} />

      <div className="container mx-auto px-4 py-6">
        {activeExperiment ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[var(--evolv-text)]">
                Experiment Dashboard
              </h1>
              <p className="text-[var(--evolv-text-light)] mt-1">
                Monitor and analyze your active experiments in real-time
              </p>
            </div>

            <MetricsPanel />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <VisualizationSection experiment={activeExperiment} />
              </div>
              <div className="lg:col-span-1">
                <EventLogPanel logs={logs} />
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center border border-[var(--evolv-border)] bg-[var(--evolv-card-background)] rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MonitorIcon />
            </div>
            <h2 className="text-xl font-semibold text-[var(--evolv-text)] mb-2">
              No Active Experiments
            </h2>
            <p className="text-[var(--evolv-text-light)] mb-6">
              There are currently no active experiments to monitor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
