const { Schema, model } = require("mongoose");

const common = {
    type: String,
    required: true,
    trim: true,
    unique: true
}

const AdminSchema = new Schema({
    username: common,
    email: common,
    password: {
        ...common,
        unique: false
    },
    admin_profile: {
        type: String
    },
    token: {
        type: String
    },
    role_id: {
        type: Number,
        default: 0,
        enum: [0, 1]
    }
}, {
    timestamps: true
})

const Admin = model('admin', AdminSchema)
module.exports = Admin