// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );
// export default sequelize;





// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // very important for Render external DBs
//     },
//   },
//   logging: false,
// });

// export default sequelize;






// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // required for external Render Postgres
//     },
//   },
//   logging: false,
// });

// sequelize.authenticate()
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch(err => console.error("❌ Database connection failed:", err.message));

// export default sequelize;


import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// ✅ Detect environment (local or production)
const isProduction = process.env.NODE_ENV === "production";

// ✅ Dynamic Sequelize setup
const sequelize = new Sequelize(
  isProduction ? process.env.DB_URL : process.env.LOCAL_DB_URL,
  {
    dialect: "postgres",
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false, // needed for Render/Postgres
          },
        }
      : {},
    logging: false,
  }
);

// ✅ Test connection
sequelize
  .authenticate()
  .then(() =>
    console.log(
      `✅ Database connected successfully → ${
        isProduction ? "Render (Cloud)" : "Localhost"
      }`
    )
  )
  .catch((err) => console.error("❌ Database connection failed:", err.message));

export default sequelize;
