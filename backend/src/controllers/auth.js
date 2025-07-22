const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      birthDate,
      imageUrl,
      address,
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with this email or phone already exists",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Validate role
    const validRoles = ["STUDENT", "ADMIN"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        error: "Invalid role. Must be STUDENT or ADMIN",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with address if provided
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role: role || "STUDENT",
      birthDate: birthDate ? new Date(birthDate) : null,
      imageUrl,
    };

    // Add address if provided
    if (address) {
      userData.address = {
        create: {
          address: address.address,
          city: address.city,
          state: address.state,
          country: address.country,
          zipCode: address.zipCode,
        },
      };
    }

    const user = await prisma.user.create({
      data: userData,
      include: {
        address: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        address: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                status: true,
              },
            },
          },
        },
        certificates: {
          include: {
            template: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, phone, birthDate, imageUrl, address } =
      req.body;

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) {
      // Check if phone is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          phone,
          id: { not: userId },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Phone number is already taken by another user",
        });
      }
      updateData.phone = phone;
    }
    if (birthDate !== undefined)
      updateData.birthDate = birthDate ? new Date(birthDate) : null;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    // Handle address update
    if (address) {
      const existingAddress = await prisma.address.findUnique({
        where: { userId },
      });

      if (existingAddress) {
        // Update existing address
        await prisma.address.update({
          where: { userId },
          data: {
            address: address.address,
            city: address.city,
            state: address.state,
            country: address.country,
            zipCode: address.zipCode,
          },
        });
      } else {
        // Create new address
        updateData.address = {
          create: {
            address: address.address,
            city: address.city,
            state: address.state,
            country: address.country,
            zipCode: address.zipCode,
          },
        };
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        address: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        error: "Current password is incorrect",
      });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "New password must be at least 6 characters long",
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user to ensure they still exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate new token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Token refreshed successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout (client-side token removal, but we can track this server-side if needed)
exports.logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is typically handled client-side
    // by removing the token. Here we just confirm the logout.
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
