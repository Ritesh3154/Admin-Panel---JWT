const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
    const token = req?.cookies?.admin
    console.log("token", token);

    if (!token) {
        return res.redirect('/Login')
    }

    const verifyToken = jwt.verify(token, "mykey")
    console.log("verify-token", verifyToken);

    if (!verifyToken) {
        return res.redirect('/Login')
    }

    req.user = verifyToken
    next()
}

exports.IsAdmin = async (req, res, next) => {
    try {
        const { role_id } = req.user
        if (role_id === 1) {
            next()
        } else {
            res.json("you are not Admin")
        }
    } catch (error) {
        console.log(error)
    }
}

exports.IsUser = async (req, res, next) => {
    try {
        const { role_id } = req.user
        if (role_id === 0) {
            next()
        } else {
            res.json("you are not User")
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isCommon = async (req, res, next) => {
    try {
        const { role_id } = req.user
        if (role_id === 0 || role_id === 1) {
            next()
        } else {
            res.json("not valid login")
        }
    } catch (error) {
        console.log(error)
    }
}