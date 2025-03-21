import { Request, Response } from 'express';
import { Experiment, EventLog } from '@shared/types/experiments';
import { socketService } from '../services/socketService';

let experiments: Experiment[] = [
  {
    experimentId: 'exp_live_001',
    variants: [
      {
        name: 'Control',
        visitors: 0,
        conversions: 0,
        revenue: 0,
        averageSessionDuration: 0
      },
      {
        name: 'Variant B',
        visitors: 0,
        conversions: 0,
        revenue: 0,
        averageSessionDuration: 0
      }
    ],
    liveUpdates: [
      {
        timestamp: new Date().toISOString(),
        control: {
          visitors: 0,
          conversions: 0,
          revenue: 0,
          averageSessionDuration: 0
        },
        variantB: {
          visitors: 0,
          conversions: 0,
          revenue: 0,
          averageSessionDuration: 0
        }
      }
    ]
  }
];

let eventLogs: EventLog[] = [
  {
    id: '1',
    experimentId: 'exp_live_001',
    timestamp: new Date().toISOString(),
    eventType: 'visitor',
    message: 'New visitor in Control group'
  },
  {
    id: '2',
    experimentId: 'exp_live_001',
    timestamp: new Date().toISOString(),
    eventType: 'conversion',
    message: 'Conversion in Variant B group'
  },
  {
    id: '3',
    experimentId: 'exp_live_001',
    timestamp: new Date().toISOString(),
    eventType: 'milestone',
    message: 'Experiment reached 1000 total visitors'
  }
];

export const getLiveExperiments = (req: Request, res: Response): void => {
  res.json(experiments);
};

export const getExperimentMetrics = (req: Request, res: Response): void => {
  const { id } = req.params;
  const experiment = experiments.find(exp => exp.experimentId === id);

  if (!experiment) {
    res.status(404).json({ message: 'Experiment not found' });
    return;
  }

  const totalVisitors = experiment.variants.reduce((sum, variant) => sum + variant.visitors, 0);
  const totalConversions = experiment.variants.reduce((sum, variant) => sum + variant.conversions, 0);
  const totalRevenue = experiment.variants.reduce((sum, variant) => sum + variant.revenue, 0);

  const metrics = {
    totalVisitors,
    conversionRate: totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0,
    averageSessionDuration: 320,
    revenuePerVisitor: totalVisitors > 0 ? totalRevenue / totalVisitors : 0
  };

  res.json(metrics);
};

export const addExperimentLog = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { eventType, message, data } = req.body;

  const experiment = experiments.find(exp => exp.experimentId === id);

  if (!experiment) {
    res.status(404).json({ message: 'Experiment not found' });
    return;
  }

  const newLog: EventLog = {
    id: (eventLogs.length + 1).toString(),
    experimentId: id,
    timestamp: new Date().toISOString(),
    eventType: eventType,
    message,
    data
  };

  eventLogs.push(newLog);

  socketService.emit('newLog', newLog);

  res.status(201).json(newLog);
};

setInterval(() => {
  experiments = experiments.map(experiment => {
    const controlVisitors = Math.floor(Math.random() * 10) + 5;
    const variantBVisitors = Math.floor(Math.random() * 10) + 5;
    const controlConversions = Math.floor(Math.random() * 3) + 1;
    const variantBConversions = Math.floor(Math.random() * 3) + 1;
    const controlRevenue = controlConversions * (Math.floor(Math.random() * 20) + 15);
    const variantBRevenue = variantBConversions * (Math.floor(Math.random() * 20) + 15);
    const controlAverageSessionDuration = Math.floor(Math.random() * 60) + 30;
    const variantBAverageSessionDuration = Math.floor(Math.random() * 60) + 30;

    experiment.variants[0].visitors += controlVisitors;
    experiment.variants[0].conversions += controlConversions;
    experiment.variants[0].revenue += controlRevenue;
    experiment.variants[0].averageSessionDuration = (experiment.variants[0].averageSessionDuration * (experiment.variants[0].visitors - controlVisitors) + controlAverageSessionDuration * controlVisitors) / experiment.variants[0].visitors;
    experiment.variants[1].visitors += variantBVisitors;
    experiment.variants[1].conversions += variantBConversions;
    experiment.variants[1].revenue += variantBRevenue;
    experiment.variants[1].averageSessionDuration = (experiment.variants[1].averageSessionDuration * (experiment.variants[1].visitors - variantBVisitors) + variantBAverageSessionDuration * variantBVisitors) / experiment.variants[1].visitors;

    const newUpdate = {
      timestamp: new Date().toISOString(),
      control: {
        visitors: controlVisitors,
        conversions: controlConversions,
        revenue: controlRevenue,
        averageSessionDuration: controlAverageSessionDuration
      },
      variantB: {
        visitors: variantBVisitors,
        conversions: variantBConversions,
        revenue: variantBRevenue,
        averageSessionDuration: variantBAverageSessionDuration
      }
    };

    experiment.liveUpdates.push(newUpdate);

    if (experiment.liveUpdates.length > 20) {
      experiment.liveUpdates = experiment.liveUpdates.slice(-20);
    }

    return experiment;
  });

  socketService.emit('experimentUpdate', experiments);
}, 5000);
