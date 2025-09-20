import { Router } from 'express';
import { getCloudinarySignature } from '../controllers/cloudinaryController';

const router = Router();

router.get('/sign', getCloudinarySignature);

export default router;
