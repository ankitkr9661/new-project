// // app.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import sequelize from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import User from "./models/userModel.js";
// import bookRoutes from "./routes/bookRoutes.js";




// dotenv.config(); // Load environment variables

// const app = express();


// // Enable CORS for frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173", // React app URL
//     credentials: true, // Allow cookies/headers if needed later
//   })
// );



// // -------------------- Middleware --------------------
// app.use(cors()); // Allow cross-origin requests (can restrict later for security)
// app.use(express.json()); // Parse incoming JSON

// // -------------------- Routes --------------------
// app.use("/api/users", userRoutes);
// app.use("/api/books", bookRoutes);



// // Health check route (optional but useful)
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "API is running..." });
// });

// // -------------------- Database & Server Setup --------------------
// const PORT = process.env.DB_URL || 5000;

// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connection established successfully.");

//     await sequelize.sync({ alter: false }); 
//     // use { alter: true } in dev to auto-update tables, but false in production

//     // Optional: log user count instead of printing all users
//     const userCount = await User.count();
//     console.log(`👥 Total users in DB: ${userCount}`);

//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   } catch (error) {
//     console.error("❌ Database connection failed:", error.message);
//     process.exit(1); // Exit process if DB fails
//   }
// };

// startServer();



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/userModel.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// -------------------- ✅ Enable CORS for both local + Render frontend --------------------
const allowedOrigins = [
  "http://localhost:5173",              // Local development
  "https://frontend-pro-2.onrender.com" // Render deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies/headers if needed later
  })
);

// -------------------- Middleware --------------------
app.use(express.json()); // Parse incoming JSON

// -------------------- Routes --------------------
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// Health check route (for testing)
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running successfully 🚀" });
});

// -------------------- Database & Server Setup --------------------
const PORT = process.env.DB_URL || 5000; // ⚠️ Fixed incorrect variable name

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    await sequelize.sync({ alter: false }); // Keep false for production
    const userCount = await User.count();
    console.log(`👥 Total users in DB: ${userCount}`);

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
