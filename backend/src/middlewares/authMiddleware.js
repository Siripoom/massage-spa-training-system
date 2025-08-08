const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    // Extract token from "Bearer TOKEN" format
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        error: "Access denied. Invalid token format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    );

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Access denied. User not found.",
      });
    }

    // Add user info to request object
    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Access denied. Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Access denied. Token expired.",
      });
    }

    res.status(500).json({
      error: "Server error during authentication.",
    });
  }
};

// Admin role middleware
const adminMiddleware = (req, res, next) => {
  // This middleware should be used after authMiddleware
  if (!req.user) {
    return res.status(401).json({
      error: "Access denied. Authentication required.",
    });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      error: "Access denied. Admin privileges required.",
    });
  }

  next();
};

// Student role middleware
const studentMiddleware = (req, res, next) => {
  // This middleware should be used after authMiddleware
  if (!req.user) {
    return res.status(401).json({
      error: "Access denied. Authentication required.",
    });
  }

  if (req.user.role !== "STUDENT") {
    return res.status(403).json({
      error: "Access denied. Student privileges required.",
    });
  }

  next();
};

// Optional auth middleware (doesn't fail if no token)
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return next();
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    );

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });

    if (user) {
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user info
    next();
  }
};

module.exports = authMiddleware;
module.exports.adminMiddleware = adminMiddleware;
module.exports.studentMiddleware = studentMiddleware;
module.exports.optionalAuthMiddleware = optionalAuthMiddleware;
