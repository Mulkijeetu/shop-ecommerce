const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken') // to generate signed token
const expressJwt = require('express-jwt') // to check authorization
exports.signup = (req, res) => {
    console.log("req.body", req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    console.log("req.body", req.body)
        // find the user based on email

    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with the email dose not exist. Please signup.'
            })
        }

        // If user is found make sure make sure email and password match
        // Create authenticate method in user model

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            })
        }

        // Generate signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);


        // Persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 })

        // return response with user and token to frontend client
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout successfully'
    })
}
exports.requireSignin =
    expressJwt({
        secret: process.env.JWT_KEY,
        algorithms: ['sha1', 'RS256', 'HS256'], // added later
        userProperty: "auth",
    })

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log("User" + req.profile);

    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    console.log("Role " + req.profile.role)
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });

    }
    next();
}