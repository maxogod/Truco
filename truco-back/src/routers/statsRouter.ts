import { Router } from 'express';
import { addLossController, addWinController, updateRatingController } from '../controllers/statsController';

const router = Router();

router.get('/addWin', addWinController);

router.get('/addLoss', addLossController);

router.post('/updateRating', updateRatingController);

export default router;
