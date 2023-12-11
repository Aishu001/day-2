import express from "express";

import bcrypt from 'bcrypt';
import User from "../models/user.js";
import { checkIfEmailExist, generateToken } from "../controller/user.js";

const router = express.Router();

// Sign-Up
router.post('/signup', async (req, res) => {
    try {
        // Check if a user with the same email exists
        const checkUserExist = await checkIfEmailExist(req);
        if (checkUserExist) {
            return res.status(409).send('Email already exists');
        }
        // Hash the password
       // Hash the password
const hashedPassword = await bcrypt.hash(req.body.password, 10);

// Create a new user
const newUser = new User({
    ...req.body,
    password: hashedPassword
});

// Save the user to the database
await newUser.save();

        // Generate a token generateToken(newUser._id)
        const token = generateToken(newUser._id);
        res.status(201).json({
            message: 'User registered successfully',
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }
});

// LOGIN  
// LOGIN
router.post('/login', async (req, res) => {
    try {
        // check if the user existscheckIfEmailExist(req)
        const isUser = await checkIfEmailExist(req) ;

        if (!isUser) {
            return res.status(403).send('Invalid User!');
        }

        // Log the isUser object to inspect its structure
        console.log('isUser:', isUser);

        // verify the password
        const { password } = req.body;

        if (!password) {
            return res.status(400).send('Password is required');
        }

        // Log the password to verify its presence
        console.log('Password:', password);

        const passwordMatch = await bcrypt.compare(password, isUser.password);


        if (!passwordMatch) {
            return res.status(403).send('Invalid Password');
        }

        // generate the token
        const token = generateToken(isUser._id);

        res.status(200).json({ message: "Successfully Logged In", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }
});

router.get('/reset_password/:id/:token', async (req, res) => {
    try {
      const { userId, token } = req.params;
      
      // Verify the token
      const decoded = jwt.verify(token, 'jwt_secret_key');

      // Check if the decoded user ID matches the one in the URL
      if (decoded.id === userId) {
        // Valid token, render a page for password reset
        res.render('password_reset', { userId, token });
      } else {
        // Invalid token or mismatched user ID
        res.status(400).send('Invalid token or user ID');
      }
      
    } catch (error) {
      // Token verification failed
      console.error('Token verification failed:', error);
      res.status(400).send('Invalid token');
    }
  });

router.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})

export const userRouter = router;



