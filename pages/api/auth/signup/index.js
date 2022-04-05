import React from "react";
import Users from "../../../models/Users";
import dbConnect from "../../../../utils/dbConnect";
import { connection } from "../../../../utils/dbConnect";

const handler = async (req, res) => {
  const { query, method, body } = req;

  if (method === "POST") {
    if (body) {
      let user = await Users.findOne({ email: body.email });
      if (user) {
        console.log("User already exists");

        res.status(400).json({success: false,message: "User already exists"})
       } else {
        user = await Users.create(body);
        res.status(201).json(user);
      }
    }
  }
};
export default handler;
