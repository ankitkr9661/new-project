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



// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import sequelize from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import User from "./models/userModel.js";
// import bookRoutes from "./routes/bookRoutes.js";

// dotenv.config(); // Load environment variables

// const app = express();

// // --------------------  Enable CORS for both local + Render frontend --------------------

// const allowedOrigins = [
//   process.env.FRONTEND_LOCAL,   // Local frontend
//   process.env.FRONTEND_RENDER,  // Render deployed frontend
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // Allow cookies/headers if needed
//   })
// );


// // -------------------- Middleware --------------------
// app.use(express.json()); // Parse incoming JSON

// // -------------------- Routes --------------------
// app.use("/api/users", userRoutes);
// app.use("/api/books", bookRoutes);

// // Health check route (for testing)
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "API is running successfully 🚀" });
// });

// // -------------------- Database & Server Setup --------------------
// const PORT = process.env.PORT || 5000; // ✅ Correct variable

// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connection established successfully.");

//     await sequelize.sync({ alter: false });
//     const userCount = await User.count();
//     console.log(`👥 Total users in DB: ${userCount}`);

//     app.listen(PORT, "0.0.0.0", () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   } catch (error) {
//     console.error("❌ Database connection failed:", error.message);
//     process.exit(1);
//   }
// };

// startServer();

















// ========================================================
// 🌐 Express Server Setup (Local + Render Compatible)
// ========================================================

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import User from "./models/userModel.js";

// ========================================================
// 🔧 Environment Configuration
// ========================================================
dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================================
// 🛡️ CORS Configuration (Local + Render Frontend)
// ========================================================
const allowedOrigins = [
  process.env.FRONTEND_LOCAL,   // Local frontend
  process.env.FRONTEND_RENDER,  // Render deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies/headers if needed later
  })
);

// ========================================================
// 🧩 Middleware
// ========================================================
app.use(express.json()); // Parse incoming JSON

// ========================================================
// 🚏 Routes
// ========================================================
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "✅ API is running successfully 🚀" });
});

// ========================================================
// 🗄️ Database Connection & Server Initialization
// ========================================================
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    // Sync models — set alter:true only during local development
    await sequelize.sync({ alter: false });

    const userCount = await User.count();
    console.log(`👥 Total users in DB: ${userCount}`);

    // Start server (0.0.0.0 ensures compatibility with Render)
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// ========================================================
// 🚀 Start the Application
// ========================================================
startServer();
