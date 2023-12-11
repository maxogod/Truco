import { Router } from 'express';
import { addLossController, addWinController,getTopRatingController } from '../controllers/statsController';

const router = Router();

router.put('/addWin', addWinController);

router.put('/addLoss', addLossController);

router.get('/top', getTopRatingController);


export default router;
