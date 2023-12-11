import express from "express";
import nodemailer from 'nodemailer'
import multer from "multer";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'

const router = express();
const storage = multer.memoryStorage(); // Use memory storage to handle file data in memory
const upload = multer({ storage: storage });


  router.post('/forgotpassword', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ Status: "User not existed" });
      }
  
      const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        }
      });
  
      const mailOptions = {

        to: email,
        subject: 'Reset Password Link',
        text: `https://silver-cendol-02bbf6.netlify.app/user/reset_password/${user._id}/${token}`
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).json({ error: 'Server Error', details: error.message });
    }
  
      
  });
  
   
    

export const ForgetPassRouter  = router;