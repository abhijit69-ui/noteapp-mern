import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // Read token from cookie
    let token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token',
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user from token id
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    // attach user request
    req.user = user;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      message: 'Not authorized',
    });
  }
};
