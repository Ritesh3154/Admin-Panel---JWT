const { default: mongoose } = require('mongoose');
const { app } = require('../server');

exports.dbConnect = () => {
    mongoose.connect('mongodb+srv://riteshpatdia0723:riteshpatdia3154@ritesh.lxy6r.mongodb.net/admin-panel-jwt')
        .then(() => {
            console.log("connected..👍");
        })
        .catch((err) => {
            console.log(err);
        })
}

