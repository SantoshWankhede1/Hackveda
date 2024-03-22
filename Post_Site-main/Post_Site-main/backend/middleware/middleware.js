const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

// Middleware for handling auth
function userMiddleware(req, res, next) {
    const token = req.cookies.jwttoken
    //console.log("omkar");
    //console.log(token);
    try {
        const decodedValue = jwt.verify(token, SECRET_KEY);
        //console.log(decodedValue.email);
        if (decodedValue.email) {
            console.log("hello")
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs at middleware page"
        })
    }
    
}

module.exports = userMiddleware;