import { Router, Request, Response, NextFunction } from 'express';
import { getLiveExperiments, getExperimentMetrics, addExperimentLog } from '../controllers/experiments';

const wrapHandler = (
  handler: (req: Request, res: Response) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = handler(req, res);
      if (result instanceof Promise) {
        result.catch(next);
      }
    } catch (err) {
      next(err);
    }
  };
};

export const setupExperimentRoutes = (router: Router): void => {
  router.get('/experiments/live', wrapHandler(getLiveExperiments));
  router.get('/experiments/:id/metrics', wrapHandler(getExperimentMetrics));
  router.post('/experiments/:id/logs', wrapHandler(addExperimentLog));
};
