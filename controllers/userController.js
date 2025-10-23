import * as userService from "../services/userService.js";

export const registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user,
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers(req.user);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const result = await userService.getUserById(req.user, Number(req.params.userId));
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const result = await userService.deleteAllUsers(req.user);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const result = await userService.deleteUserById(req.user, Number(req.params.userId));
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
