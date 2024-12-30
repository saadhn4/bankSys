import express from "express";
import jwt from "jsonwebtoken";
import config from "config";
const JWT_SECRET = config.get("JWT_SECRET");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  try {
    let check = jwt.verify(token, JWT_SECRET);
    req.user = check;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Invalid token!" });
  }
};

export default authMiddleware;
