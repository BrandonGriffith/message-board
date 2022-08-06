const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Must have username"],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test (val),
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, "Must have password"],
        minlength: [8, 'Password must be at least 8 characters'],
    },
},
{timestamps: true}
);

userSchema.virtual('confirmPass').get( () => this.confirmPass ).set( value => this.confirmPass = value ); 

userSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPass) this.invalidate('confirm', 'Passwords must match');
    next();
    });

const User = mongoose.model("User", userSchema);
module.exports = User;