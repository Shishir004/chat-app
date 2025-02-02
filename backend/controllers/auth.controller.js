const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary");

const signup = async (req, res) => {
    const { fullname, email, password, profilePic } = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsermodel = new User({
            fullname,
            email,
            password: hashedPassword,
            profilePic,
        });

        if (newUsermodel) {
            const generateToken = (userId, res) => {
                const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
                res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });
            };

            generateToken(newUsermodel._id, res);
            await newUsermodel.save();
            return res.status(200).json({ message: "Saved successfully" });
        } else {
            return res.status(400).json({ message: "Invalid user details" });
        }
    } catch (error) {
        console.log("Error in signup controller: " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const generateToken = (userId, res) => {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
            res.cookie("jwt",token);
        };

        generateToken(user._id, res);
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log("Error in login: " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = { signup, login, logout, updateProfile, checkAuth };
