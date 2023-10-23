import dotenv from "dotenv";
dotenv.config();

export default {
  port: 5000,
  origin: "http://localhost:3000",
  mongo_url: process.env["MONGO_DEVELOPMENT_URL"],
  saltWorkFactor: "13",
  rsaPriviteKey: process.env["RSA_PRIVATE_KEY"],
  rsaPublicKey: process.env["RSA_PUBLIC_KEY"],
};
