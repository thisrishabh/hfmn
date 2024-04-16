import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true });

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;