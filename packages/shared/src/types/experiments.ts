export interface Variant {
  name: string;
  visitors: number;
  conversions: number;
  revenue: number;
  averageSessionDuration: number;
}

export interface VariantUpdate {
  visitors: number;
  conversions: number;
  revenue: number;
  averageSessionDuration: number;
}

export interface LiveUpdate {
  timestamp: string;
  control: VariantUpdate;
  variantB: VariantUpdate;
}

export interface Experiment {
  experimentId: string;
  variants: Variant[];
  liveUpdates: LiveUpdate[];
}

export interface ExperimentMetrics {
  totalVisitors: number;
  conversionRate: number;
  averageSessionDuration: number;
  revenuePerVisitor: number;
}

export interface EventLog {
  id: string;
  experimentId: string;
  timestamp: string;
  eventType: 'visitor' | 'conversion' | 'milestone' | 'revenue';
  message: string;
  data?: Record<string, any>;
}
