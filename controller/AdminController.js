const sendEmail = require('../config/Mail')
const Admin = require('../model/AdminModel')
const { ForgotMail } = require('../utils/ForgotMail')
const { plainToHash, hashToPlain } = require('../utils/password')
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmpwd } = req.body
        const existEmail = await Admin.findOne({ email: email }).countDocuments().exec()

        if (existEmail > 0) {
            res.json("email already exists!!!!")
        } else {
            const hash = await plainToHash(password)
            await Admin.create({ username, email, password: hash, confirmpwd })
            // res.json("")
            req.flash('info', 'u are registered!!')
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const existEmail = await Admin.findOne({ email: email }).countDocuments().exec()
    if (existEmail > 0) {
        const existUser = await Admin.findOne({ email })
        console.log(existUser);
        const matchPass = await hashToPlain(password, existUser.password)
        if (matchPass) {
            const payload = {
                // cookie

                // username: existUser.username,
                // email: existUser.email

                // jwt

                id: existUser._id,
                role_id: existUser.role_id
            }
            const token = jwt.sign(payload, 'mykey', { expiresIn: '1d' })
            res.cookie('admin', token, payload, { httpOnly: true, maxAge: 60 * 60 * 1000 })
            res.redirect('/')
        } else {
            res.json("pass does not match!!")
        }
    } else {
        res.json("email does not exists")
    }
}


exports.updateprofile = async (req, res) => {
    try {
        const { email, username } = req.body
        const existemail = await Admin.findOne({ email }).countDocuments().exec()
        console.log(req.file)
        if (existemail > 0) {
            await Admin.updateOne(
                {
                    email: email
                },
                {
                    username,
                    admin_profile: req?.file?.filename
                }
            )
            res.redirect('/MyProfile')
        } else {
            res.json("email id not exist")
        }
    } catch (error) {
        console.log(error)
    }
}

exports.ChangePassword = async (req, res) => {
    console.log(req.body);
    const { email, password, new_pass, confirm_pass } = req.body
    const existemail = await Admin.findOne({ email }).countDocuments().exec()
    if (existemail > 0) {
        const admin = await Admin.findOne({ email })
        const match = await hashToPlain(password, admin.password)

        if (match) {
            console.log(new_pass)
            console.log(confirm_pass)

            if (new_pass === confirm_pass) {
                const hash_pass = await plainToHash(new_pass)

                await Admin.updateOne(
                    {
                        email: email
                    },
                    {
                        password: hash_pass
                    }
                )
                req.flash('info', 'Your password has been Changed!!')
                res.redirect('/ChangePassword')
            } else {
                res.json("confirm password does not match")
            }

        } else {
            res.json(" password does not match")
        }

    } else {
        res.json("email does not exist")
    }
}

exports.forgotPassword = async (req, res) => {
    const { username, email } = req.body

    const existemail = await Admin.findOne({ email }).countDocuments().exec()
    if (existemail > 0) {

        // var otp = Math.floor(Math.random() * 1000000)
        var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        //to enter token in database
        await Admin.updateOne({ email }, { token: otp })

        const username = await Admin.findOne({ email })

        await sendEmail(email, "forgot password", ForgotMail(username, otp))
        req.flash('info', 'check your email....')
        res.redirect('/login')
    } else {
        req.flash('info', 'email does not exist')
        res.redirect('/login')
    }
}

exports.update_password = async (req, res) => {

    const { token, password, confirm_pass } = req.body
    console.log(req.body);

    const existToken = await Admin.findOne({ token }).countDocuments().exec()
    if (existToken) {

        if (password == confirm_pass) {
            const hash_pass = await plainToHash(password)
            const admin = await Admin.findOne({ token })

            await Admin.findByIdAndUpdate(
                {
                    _id: admin._id
                },
                {
                    password: hash_pass,
                    token: ""
                }
            )
            req.flash('info', "your password has been updated!!")
            res.redirect('/login')
        } else {
            req.flash('info', "confirm password does not matched")
            res.redirect('/updatepwd')
        }
    } else {
        req.flash('info', "token is incorrect")
        res.redirect('/updatepwd')
    }
}