import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export async function checkIfEmailExist(req) {
    const email = req.body.email;
    const existingUser = await User.findOne({ email: email }).select('+password');
    return existingUser; // Return the user object, including the password
}




export function generateToken(getTheID){
      return jwt.sign({getTheID} , process.env.SECRET_KEY)
}



