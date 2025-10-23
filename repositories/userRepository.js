// repositories/userRepository.js
import User from "../models/userModel.js";

// ✅ Find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// ✅ Create new user
export const createUser = async (userData) => {
  return await User.create(userData);
};

// ✅ Get all users
export const findAllUsers = async () => {
  return await User.findAll({
    attributes: ["userId", "name", "email", "contactNumber", "role"]
  });
};

export const findUserById = async (userId) => {
  const user = await User.findOne({
    where: { userId: Number(userId) },
    attributes: ["userId", "name", "email", "contactNumber", "role"]
  });
  return user || null; // ensure predictable return value
};


// ✅ Delete all users
export const deleteAllUsers = async () => {
  return await User.destroy({ where: {} });
};

// ✅ Delete user by ID
export const deleteUserById = async (userId) => {
  return await User.destroy({ where: { userId } });
};
