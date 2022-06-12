const express = require('express')
const UserModel = require('../models/userSchema')
// pulls out the two function we need from express validator
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create a Router
const router = express.Router()

// Create or Register a new User
router.post ('/',[
    check('username', "Username is required from Middleware!").notEmpty(),
    check('email', "Please use a valid email from Middleware").isEmail(),
    check('password', "Please add six or more characters").isLength({min: 6}),
    check('password', "Please enter a password").notEmpty()
] ,async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
     // Checks for validation errors
    if (!errors.isEmpty()){     //we are checking that is not empty
        return res.status(400).json(errors.array())
    }
    
    try {
        // checking if there is an user with this email in the db
        const userExist = await UserModel.findOne({email: userData.email})
        // if user exist we return!
        if (userExist) {
            return res.json({msg: "User already exist"})
        }

        //* Create a new User
        // 1 Create the salt
        const SALT = await bcrypt.genSalt(10)
        // 2 use the salt to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        // 3 assign the hashed passwoed to the userData
        userData.password = hashedPassword
        console.log(hashedPassword); 

        // write the user to the db
        const user = await UserModel.create(userData)
        
         
        //* Create a new Token
         const payload = {
            id: user._id,
            email: user.email
        }

        //const SECRET_KEY='MY_SECRET_KEY!!!' // 'MY_SECRET_KEY' - secret key for secure 

        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY) //put this secure key in folder .env to prevent leak

        res.status(201).json({
            user: user,
            token:TOKEN
        })

        //res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!!!')
    }
})

module.exports = router