import { Router } from 'express';
import {
  acceptSpot,
  getPendingSpots,
  rejectSpot,
  reportSpot,
  getSpotReports,
  dismissReport,
  deleteReportedSpot,
} from '../controllers/moderationController';

const router = Router();

router.get('/pending', getPendingSpots);
router.put('/accept/:id', acceptSpot);
router.delete('/reject/:id', rejectSpot);
router.post('/report', reportSpot);

// Spot reports management
router.get('/reports', getSpotReports);
router.delete('/reports/:id', dismissReport);
router.delete('/reports/:reportId/spot/:spotId', deleteReportedSpot);

export default router;
