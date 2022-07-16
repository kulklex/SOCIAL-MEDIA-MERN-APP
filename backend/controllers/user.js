const bcrypt = require('bcrypt') //note bcrypt is used for hashing passwords
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body

    try {
        const existingUser = await User.findOne({email}) //This is to fetch the email inputted 
        if(existingUser) return res.status(400).json({message: "User already exists!"}) // This will check if the user already exists, so as to prevent duplicate users

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match!"}) //To make sure the password and confirmPassword inputs match

        const hashedPassword = await bcrypt.hash(password, 12) //we're hashing the password using bcrypt, the second argument is the salt(the number is the level of difficulty we want the hash to follow, default is 10)

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`}) // Finally creating the user, we joined the firstName and lastName variables to one and called it 'name'
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '2h'})

        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({message: "Couldn't process the signUp....", error})
    }
}



const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        //Here we're signing in
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "Invalid email or password"}) //We expect the user to exist, so we're checking the database for it, if it doesn't exist we flag it

        //Note that the password is encrypted as to why we're making use of bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password) //To compare the inputted password(password) with the password saved in the database for that user(existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid email or password"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id},  'test', {expiresIn: '2h'}) //we're using jwt to send the data to the frontend, note the 'test' here it was expecting a secret key that is in the .env file, also the {expireIn} states when the user token will expire i.e. how long it'll take before the user is automatically loggedOut
        res.status(200).json({result: existingUser, token})
    
    } catch (error) {
        res.status(500).json({message: "Couldn't process the signIn.... "}, error)
    }
}





module.exports = {signin, signup}