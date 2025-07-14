import express from 'express';
import {
  getUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getClaimHistory
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.post('/claim/:id', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history/:userId', getClaimHistory);

export default router;
