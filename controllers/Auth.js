import Auth from "../models/Auth.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
     res.status(404).json({
          message: 'Email dan Password Tidak Boleh Kosong',
     })
  }
};
