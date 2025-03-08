exports.matchLogin = (req, res, path) => {
    const cookieData = req?.cookies.admin

    if (!cookieData) {
        res.redirect('/login')
    } else {
        res.render('pages/index')
    }
}