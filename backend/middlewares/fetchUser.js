import jwt from "jsonwebtoken";
import User from "../models/User.js";

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({success: false, message: "Access Denied!" });
  }
  try {

    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    next();

  } catch (error) {
    return res.status(401).send({ success: false, message: "Access Denied!" });
  }
};

export default fetchUser;