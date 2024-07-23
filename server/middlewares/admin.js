const ErrorHander = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
exports.isAuthenticatedAdmin = async (req, res, next) => {
    const  token  = (req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '');
    console.log(token)
    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);
    if(user.Role === "admin"){
        req.user = user
        next()
    }else{
        return next(new ErrorHander("You are not Authorised Admin ", 401));
    }

};