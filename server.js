const express = require('express')
const app = express()
exports.app = app

require('dotenv').config()
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const jwt = require('jsonwebtoken')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/public', express.static("uploads/product"))
app.use('/public', express.static("uploads/admin"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('uploads'))

app.use(cookieParser())

app.use(flash())


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

require('./config/db').dbConnect()

app.use(async (req, res, next) => {

    try {

        const token = req?.cookies?.admin

        if (!token) {
            return res.redirect('/Login')
        }

        const verifyToken = jwt?.verify(token, "mykey")
        const singleAdmin = await Admin.findById(verifyToken.id)

        res.locals.req = req
        res.locals.res = res
        res.locals.singleAdmin = singleAdmin
        next()
    } catch (error) {
        console.log(error)
        res.redirect('/login')
    }

})


const ViewRoutes = require('./router/ViewRouter')
const CategoryRouter = require('./router/CategoryRouter')
const AdminRouter = require('./router/AdminRouter')
const subCatRouter = require('./router/SubCatRouter')
const ProductRouter = require('./router/ProductRouter')
const Admin = require('./model/AdminModel')

app.use('/api/category', CategoryRouter)
app.use('/api/register', AdminRouter)
app.use('/api/subcat', subCatRouter)
app.use('/api/product', ProductRouter)
app.use('/', ViewRoutes)



app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))   