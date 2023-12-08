import { Router } from 'express';
import { addLossController, addWinController, updateRatingController } from '../controllers/statsController';

const router = Router();

router.put('/addWin', addWinController);

router.put('/addLoss', addLossController);

router.put('/updateRating', updateRatingController);

export default router;
