"use client";

import { JSX } from "react";
import UserIcon from "@/components/icons/UserIcon";
import ConversionIcon from "@/components/icons/ConversionIcon";
import TimeIcon from "@/components/icons/TimeIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import MetricCard from "@/components/MetricCard";
import { formatDuration } from "@/utils/dateUtils";
import { useExperimentData } from "@/hooks/useExperimentData";

export default function MetricsPanel(): JSX.Element {
  const { experiments, metrics } = useExperimentData();
  const { variants } = experiments[0] || [];
  const { revenuePerVisitor } = metrics || {};

  const calculateConversionRate = (conversions: number, visitors: number) => {
    if (visitors === 0) return 0;
    return (conversions / visitors) * 100;
  };

  return (
    <div className="bg-[var(--evolv-card-background)] shadow-[var(--evolv-shadow)] rounded-lg p-6 mt-6 border border-[var(--evolv-border)]">
      <h2 className="text-xl font-semibold mb-4 text-[var(--evolv-text)]">
        Key Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Visitors"
          value={variants?.[0].visitors + variants?.[1].visitors || 0}
          suffix="visitors"
          icon={<UserIcon />}
        />

        <MetricCard
          title="Conversion Rate - Control"
          value={
            calculateConversionRate(
              variants?.[0].conversions || 0,
              variants?.[0].visitors || 0
            ).toFixed(2) || 0
          }
          suffix="%"
          icon={<ConversionIcon />}
        />

        <MetricCard
          title="Conversion Rate - Variant B"
          value={
            calculateConversionRate(
              variants?.[1].conversions || 0,
              variants?.[1].visitors || 0
            ).toFixed(2) || 0
          }
          suffix="%"
          icon={<ConversionIcon />}
        />

        <MetricCard
          title="Avg. Session Duration"
          value={formatDuration(variants?.[0].averageSessionDuration || 0)}
          icon={<TimeIcon />}
        />

        <MetricCard
          title="Revenue per Visitor"
          value={`$${revenuePerVisitor?.toFixed(2) || 0}`}
          icon={<MoneyIcon />}
        />
      </div>
    </div>
  );
}
