import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "Editor", "User"],
        default: "User"
    },
},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
);

const User = mongoose.model("User", userSchema);

export default User; 