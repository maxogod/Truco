import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
            trim: true,
        },
        rating: {
            type: mongoose.Schema.Types.Number,
            required: true,
            default: 0,
        },
        wins: {
            type: mongoose.Schema.Types.Number,
            required: true,
            default: 0,
        },
        losses: {
            type: mongoose.Schema.Types.Number,
            required: true,
            default: 0,
        },
        friends: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true,
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
