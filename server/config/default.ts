import dotenv from "dotenv";
dotenv.config();

export default {
  port: 5000,
  origin: "http://localhost:3000",
  mongo_url: process.env.MONGO_DEVELOPMENT_URL,
};
