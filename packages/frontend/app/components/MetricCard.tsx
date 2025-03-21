"use client";

interface MetricCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  icon: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  suffix,
  icon,
}: MetricCardProps) {
  return (
    <div className="bg-[var(--evolv-background-alt)] p-4 rounded-lg border border-[var(--evolv-border)] transition-all hover:shadow-[var(--evolv-shadow)]">
      <div className="flex items-center mb-2">
        <div className="text-[var(--evolv-primary)] mr-2">{icon}</div>
        <h3 className="text-sm font-medium text-[var(--evolv-text-light)]">
          {title}
        </h3>
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold text-[var(--evolv-text)]">
          {value}
          {suffix && (
            <span className="text-sm text-[var(--evolv-text-light)] ml-1">
              {suffix}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
