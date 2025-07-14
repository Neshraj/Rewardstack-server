import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Claim random points for a user
export const claimPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({
      userId: user._id,
      points
    });
    await history.save();

    //Emit WebSocket event to update leaderboard in real-time
    const io = req.app.get('io');
    io.emit('pointsClaimed', {
      userId: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      points,
    });

    res.json({ message: 'Points claimed!', points,'name':user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get leaderboard (sorted by totalPoints desc)
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get claim history for a user
export const getClaimHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
