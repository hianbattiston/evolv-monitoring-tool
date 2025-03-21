import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Experiment, EventLog, ExperimentMetrics } from '@shared/types/experiments';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface IUseExperimentData {
  experiments: Experiment[];
  metrics: ExperimentMetrics | null;
  logs: EventLog[];
  loading: boolean;
  error: string | null;
}

export function useExperimentData(): IUseExperimentData {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [metrics, setMetrics] = useState<ExperimentMetrics | null>(null);
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchInitialData() {
    try {
      const experimentsResponse = await fetch(`${API_URL}/api/experiments/live`);
      if (!experimentsResponse.ok) throw new Error('Failed to fetch experiments');
      const experimentsData = await experimentsResponse.json();
      setExperiments(experimentsData);

      if (experimentsData.length > 0) {
        const experimentId = experimentsData[0].experimentId;
        const metricsResponse = await fetch(`${API_URL}/api/experiments/${experimentId}/metrics`);
        if (!metricsResponse.ok) throw new Error('Failed to fetch metrics');
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData);

        const sampleLogs: EventLog[] = [
          {
            id: '1',
            experimentId,
            timestamp: new Date().toISOString(),
            eventType: 'visitor',
            message: 'New visitor in Control group'
          },
          {
            id: '2',
            experimentId,
            timestamp: new Date(Date.now() - 60000).toISOString(),
            eventType: 'conversion',
            message: 'Conversion in Variant B group'
          },
          {
            id: '3',
            experimentId,
            timestamp: new Date(Date.now() - 120000).toISOString(),
            eventType: 'milestone',
            message: 'Experiment reached 1000 total visitors'
          }
        ];
        setLogs(sampleLogs);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Failed to fetch experiment data');
      setLoading(false);
    }
  }

  useEffect(() => {
    const socketInstance = io(API_URL);
    setSocket(socketInstance);
    fetchInitialData();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('experimentUpdate', (updatedExperiments: Experiment[]) => {
      setExperiments(updatedExperiments);
      setLoading(false);
    });

    socket.on('newLog', (newLog: EventLog) => {
      setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 100));
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError('Failed to connect to the server');
      setLoading(false);
    });

    return () => {
      socket.off('experimentUpdate');
      socket.off('newLog');
      socket.off('connect_error');
    };
  }, [socket]);

  return { experiments, metrics, logs, loading, error };
}
