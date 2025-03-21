"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Experiment } from "@shared/types/experiments";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface VisualizationSectionProps {
  experiment: Experiment;
}

export default function VisualizationSection({
  experiment,
}: VisualizationSectionProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const documentTheme = document.documentElement.getAttribute("data-theme");
    if (documentTheme === "dark") {
      setTheme("dark");
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme");
          setTheme(newTheme === "dark" ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const variantNames = experiment.variants.map((v) => v.name);
  const variantVisitors = experiment.variants.map((v) => v.visitors);
  const variantConversions = experiment.variants.map((v) => v.conversions);
  const variantRevenue = experiment.variants.map((v) => v.revenue);

  const timestamps = experiment.liveUpdates.map((update) => {
    const date = new Date(update.timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  const controlVisitorsTrend = experiment.liveUpdates.map(
    (update) => update.control.visitors
  );
  const variantVisitorsTrend = experiment.liveUpdates.map(
    (update) => update.variantB.visitors
  );

  const controlConversionsTrend = experiment.liveUpdates.map(
    (update) => update.control.conversions
  );
  const variantConversionsTrend = experiment.liveUpdates.map(
    (update) => update.variantB.conversions
  );

  const barData = {
    labels: variantNames,
    datasets: [
      {
        label: "Visitors",
        data: variantVisitors,
        backgroundColor: "rgba(27, 79, 210, 0.7)",
      },
      {
        label: "Conversions",
        data: variantConversions,
        backgroundColor: "rgba(91, 110, 245, 0.7)",
      },
      {
        label: "Revenue ($)",
        data: variantRevenue,
        backgroundColor: "rgba(237, 109, 85, 0.7)",
      },
    ],
  };

  const lineData = {
    labels: timestamps,
    datasets: [
      {
        label: "Control Visitors",
        data: controlVisitorsTrend,
        borderColor: "rgb(27, 79, 210)",
        backgroundColor: "rgba(27, 79, 210, 0.3)",
      },
      {
        label: "Variant B Visitors",
        data: variantVisitorsTrend,
        borderColor: "rgb(91, 110, 245)",
        backgroundColor: "rgba(91, 110, 245, 0.3)",
      },
    ],
  };

  const conversionLineData = {
    labels: timestamps,
    datasets: [
      {
        label: "Control Conversions",
        data: controlConversionsTrend,
        borderColor: "rgb(237, 109, 85)",
        backgroundColor: "rgba(237, 109, 85, 0.3)",
      },
      {
        label: "Variant B Conversions",
        data: variantConversionsTrend,
        borderColor: "rgb(186, 83, 112)",
        backgroundColor: "rgba(186, 83, 112, 0.3)",
      },
    ],
  };

  return (
    <section className="bg-[var(--evolv-card-background)] shadow-[var(--evolv-shadow)] border border-[var(--evolv-border)] rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--evolv-text)]">
          Experiment Performance
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="h-80">
          <h3 className="text-lg font-medium mb-2 text-[var(--evolv-text)]">
            Variant Comparison
          </h3>
          <div className="h-64 bg-[var(--evolv-background-alt)] p-2 rounded-lg border border-[var(--evolv-border)]">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: theme === "dark" ? "#e2e8f0" : "#334155" },
                  },
                  y: {
                    ticks: { color: theme === "dark" ? "#e2e8f0" : "#334155" },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: theme === "dark" ? "#e2e8f0" : "#334155",
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.dataset.label || "";
                        const value = context.parsed.y;
                        if (label === "Revenue ($)") {
                          return `${label}: $${value}`;
                        }
                        return `${label}: ${value}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="h-80">
          <h3 className="text-lg font-medium mb-2 text-[var(--evolv-text)]">
            Visitors Trend
          </h3>
          <div className="h-64 bg-[var(--evolv-background-alt)] p-2 rounded-lg border border-[var(--evolv-border)]">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: theme === "dark" ? "#e2e8f0" : "#334155" },
                  },
                  y: {
                    ticks: { color: theme === "dark" ? "#e2e8f0" : "#334155" },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: theme === "dark" ? "#e2e8f0" : "#334155",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="h-80">
          <h3 className="text-lg font-medium mb-2 text-[var(--evolv-text)]">
            Conversions Trend
          </h3>
          <div className="h-64 bg-[var(--evolv-background-alt)] p-2 rounded-lg border border-[var(--evolv-border)]">
            <Line
              data={conversionLineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: theme === "dark" ? "#e2e8f0" : "#334155" },
                  },
                  y: {
                    ticks: { color: theme === "dark" ? "#e2e8f0" : "#334155" },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: theme === "dark" ? "#e2e8f0" : "#334155",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
