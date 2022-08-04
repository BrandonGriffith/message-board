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

userSchema.virtual('confirmPass').get( () => this._confirmPass ).set( value => this._confirmPass = value ); 

userSchema.pre('validate', (next) => {
    if (this.password !== this.confirmPass) this.invalidate('confirmPass', 'Passwords must match');
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;