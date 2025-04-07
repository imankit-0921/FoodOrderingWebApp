import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        default: {}
    }
    // phone: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: {},
    //     required: true
    // },
    // answer: {
    //     type: String,
    //     required: true
    // },
    // role: {
    //     type: Number,
    //     default: 0
    // }
}, { minimize: false })

const userModel = mongoose.model.user || mongoose.model('user', userSchema)
export default userModel;