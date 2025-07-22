const prisma = require("../config/db");
const bcrypt = require("bcryptjs");

// Create a new user
const createUser = async (req, res) => {
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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with nested address
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role: role || "STUDENT",
        birthDate: birthDate ? new Date(birthDate) : null,
        imageUrl,
        address: address
          ? {
              create: {
                address: address.address,
                city: address.city,
                state: address.state,
                country: address.country,
                zipCode: address.zipCode,
              },
            }
          : undefined,
      },
      include: {
        address: true, // Include address in response
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        birthDate: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        address: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            country: true,
            zipCode: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        password: false,
      },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        birthDate: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        address: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            country: true,
            zipCode: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        password: false, // Exclude password
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      birthDate,
      imageUrl,
      address,
      password,
    } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prepare update data
    const updateData = {
      firstName,
      lastName,
      email,
      phone,
      role,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      imageUrl,
    };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user and address
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...updateData,
        address: address
          ? {
              upsert: {
                create: {
                  address: address.address,
                  city: address.city,
                  state: address.state,
                  country: address.country,
                  zipCode: address.zipCode,
                },
                update: {
                  address: address.address,
                  city: address.city,
                  state: address.state,
                  country: address.country,
                  zipCode: address.zipCode,
                },
              },
            }
          : undefined,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        birthDate: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        address: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            country: true,
            zipCode: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        password: false, // Exclude password
      },
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete user (address will be automatically deleted due to cascade delete)
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
