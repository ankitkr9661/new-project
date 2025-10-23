import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

// ==============================
// REGISTER USER
// ==============================
export const registerUser = async (userData) => {
  const { name, email, password, contactNumber, role } = userData;

  // Basic validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Check existing user
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
    contactNumber,
    role: role || "USER",
  });

  // Remove password from response
  const { password: _, ...safeUser } = newUser.dataValues;

  return {
    message: "User registered successfully",
    user: safeUser,
  };
};

// ==============================
// LOGIN USER
// ==============================
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    message: "Login successful",
    token,
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// ==============================
// GET ALL USERS
// ==============================
export const getAllUsers = async (loggedInUser) => {
  if (loggedInUser.role !== "ADMIN") {
    throw new Error("Access Denied: Admins only");
  }

  const users = await userRepository.findAllUsers();
  return {
    message: "Users fetched successfully",
    users,
  };
};

// ==============================
// GET USER BY ID
// ==============================
export const getUserById = async (loggedInUser, userId) => {
  if (!loggedInUser) {
    throw new Error("Unauthorized: No user info");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  const loggedInUserId = Number(loggedInUser.userId || loggedInUser.id);
  const loggedInUserRole = loggedInUser.role;

  if (loggedInUserRole !== "ADMIN" && loggedInUserId !== userId) {
    throw new Error("Access Denied: You can only access your own data");
  }

  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    message: "User fetched successfully",
    user,
  };
};

// ==============================
// DELETE ALL USERS
// ==============================
export const deleteAllUsers = async (loggedInUser) => {
  if (!loggedInUser) {
    throw new Error("Unauthorized: No user info");
  }

  if (loggedInUser.role !== "ADMIN") {
    throw new Error("Access Denied: Only admins can delete all users");
  }

  const deletedCount = await userRepository.deleteAllUsers();

  return {
    message: `${deletedCount} user(s) deleted successfully`,
  };
};

// ==============================
// DELETE USER BY ID
// ==============================
export const deleteUserById = async (loggedInUser, userId) => {
  if (!loggedInUser) {
    throw new Error("Unauthorized: No user info");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  const loggedInUserId = Number(loggedInUser.userId || loggedInUser.id);
  const loggedInUserRole = loggedInUser.role;

  if (loggedInUserRole !== "ADMIN" && loggedInUserId !== userId) {
    throw new Error("Access Denied: You can only delete your own account");
  }

  const deleted = await userRepository.deleteUserById(userId);
  if (!deleted) {
    throw new Error("User not found");
  }

  return {
    message: `User with ID ${userId} deleted successfully`,
  };
};
