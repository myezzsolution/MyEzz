// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-invoice", async (req, res) => {
  const { order, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "your-app-password" // not your normal password
    }
  });

  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "New MyEzz Order",
    text: JSON.stringify(order, null, 2)
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Invoice sent");
  } catch (error) {
    res.status(500).send("Failed to send invoice" + error.message);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
