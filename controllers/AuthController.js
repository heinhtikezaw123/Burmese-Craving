const User = require('../db/models/user');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utlis/AppError');

const generateToken = (payload) => {
    return jwt.sign(payload,process.env.SECRET_KEY,{
        expiresIn : process.env.EXPIRED_IN
    })
}

const register = async (req , res , next) => {
    const body = req.body;

   if(!['1','2'].includes(body.userType)) {
        throw new AppError('Invalid User Type',400);
   }
    const newUser = await User.create({
        userType : body.userType,
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
        password : body.password,
        confirmPassword : body.confirmPassword,
    })

    if(!newUser) {
        throw new AppError('Failed to create the new user!',401);
    }

    const result  = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id : result.id,
        userType : result.userType
    })

    return res.status(201).json({
        status : 'success',
        message : 'User Created Successfully!',
        data : result
    })
}

const login = async ( req , res , next ) => {

    const {email , password} = req.body;

    if(!email || !password) {
        throw new AppError('Please provide email and password!',400);
    }

    const user = await User.findOne({where : {email}});

    if(!user || !(await bcrypt.compare(password , user.password))) {
        throw new AppError('Incorrect email or password!',401);
    }

    const token = generateToken({
        id : user.id,
        userType : user.userType
    })

    return res.status(200).json({
        status : 'success',
        message : `Successfully Login , Welcome Back ${user.firstName}!`,
        token,
    })

}

module.exports = { register , login};