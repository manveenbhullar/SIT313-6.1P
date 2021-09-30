const mongoose = require("mongoose")
const validator = require("validator")
const expertSchema = new mongoose.Schema(
    {
        fname: {
            type: String
        },
        lname: {
            type: String
        },
        email: {
            type: String,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Emailis not valid')
                }
            }
        },
        password: {
            type: String
        },
        address: {
            type: String
        },
        phone_num: {
            type: Number,
            minlength: 10,
            maxlength: 12
        },
    }
)

module.exports= mongoose.model("Expert", expertSchema)