import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Mobile:{
        type: Number,
        required: true,
        unique: true
    }
})

var User = mongoose.model('User', userSchema);

export default User;