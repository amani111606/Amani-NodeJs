require('dotenv').config();
const UserModel = require('../models/user')
const CryptoJS = require("crypto-js");
const jwttoken = require('jsonwebtoken')
//register
const registerUser = async(req,res) => {
    try {
        const {username,email,password,role} = req.body;
        const checkUserExisted = await UserModel.findOne({$or : [{username},{email}]})
            if(checkUserExisted){
                res.status(400).json({
                    success: false,
                    message: 'User existed with the provided details, please try with diff username/email'
                })
            }
            // Encrypt
            // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
            const encryptedpassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
            console.log('ENCRYPTEDPASS-------->',encryptedpassword);

            const newUserReg = new UserModel({
                username,
                email,
                password: encryptedpassword,
                role : role || 'user'
            })
            await newUserReg.save();
            if(!newUserReg) {
                res.status(400).json({
                    success: false,
                    message: 'User existed with the provided details, please try with diff username/email'
                })
            }
            res.status(200).json({
                success: true,
                message: 'Registration succesfully done!',
                data: newUserReg
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong!!!!!!!!!!!!'
        })
    }
}


//login
const loginUser = async(req,res) => {
    try {
        // Decrypt
        // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
        // var originalText = bytes.toString(CryptoJS.enc.Utf8);
        const {email,password} = req.body;
        const getLoggedInUser = await UserModel.findOne({email})
        if(!getLoggedInUser) {
            res.status(404).json({
                success: false,
                message: 'Invalid credentials...'
            })
        }
        if(CryptoJS.AES.decrypt(getLoggedInUser.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8) !== password)
        {
            res.status(404).json({
                success: false,
                message: 'Invalid credentials..!!!!!!!!!!.'
            })
        }  


        //create token
        const jwttokenvalue = jwttoken.sign({
            userId : getLoggedInUser._id,
            username: getLoggedInUser.username,
            role: getLoggedInUser.role
        },process.env.SECRET_KEY,
        {
            expiresIn: '15m'
        })

        res.status(200).json({
            success: true,
            message: 'welcome to home',
            accessToken: jwttokenvalue
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong ${error}`
        })
    }
}

module.exports = {registerUser,loginUser}
