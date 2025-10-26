const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;

    const newUser = await user.create({
        username: body.username,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });

    if (!newUser) {
        return next(new AppError('Failed to create user', 400));
    };

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    const token = generateToken({
        id: result.id
    });

    return res.status(201).json({
        status: 'success',
        message: 'Successfully user created',
        username: newUser.username,
        token,
    });
});

const login = (async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const result = await user.findOne({
        where: {
            email
        }
    });
    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({
        id: result.id
    });

    return res.json({
        status: 'Success',
        token,
        username: result.username
    });
});

const authentication = catchAsync(async (req, res, next) => {
    let idToken = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1]
    }
    if(!idToken) {
        return next(new AppError('Please login to get access', 401));
    }

    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET)

    const freshUser = await user.findByPk(tokenDetail.id);

    if(!freshUser){
        return next(new AppError('User no longer exists', 400));
    }

    req.user = freshUser;
    return next();
})

module.exports = {
    signup,
    login,
    authentication
};