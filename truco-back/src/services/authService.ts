import { comparePassword, hashPassword } from "../utils/hashing";
import User from "../models/User";

const createUser = async (username: string, password: string) => {
    const hashedPassword = hashPassword(password);

    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const authenticateUser = async (username: string, password: string) => {
    const user = await User.findOne({ username });

    if (!user) return null;

    if (!comparePassword(password, user.password)) return null;

    return user
}

const getUser = async (username: string) => {
    const user = await User.findOne({ username });
    return user;
}

export {
    createUser,
    authenticateUser,
    getUser,
}