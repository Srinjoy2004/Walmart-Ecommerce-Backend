import dotenv from "dotenv";

dotenv.config();

export default {
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
};
