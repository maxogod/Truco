import { Request, Response, NextFunction } from 'express';
import { getUser } from '../services/authService';

const userRegex = /^[a-zA-Z0-9]+$/; // only letters and numbers
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()-_+=<>?]{8,}$/; // at least 8 characters, only letters, numbers and !@#$%^&*()-_+=<>?

const registerValidation = async (req: Request, res: Response, next: NextFunction) => {

    // if (req.session.user) return res.status(401).send("User already logged in");

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }

    if (!userRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(400).send('Invalid username or password');
    }

    const existingUser = await getUser(username);

    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    next();
}

const loginValidation = (req: Request, res: Response, next: NextFunction) => {

    // if (req.session.user) return res.status(401).send("User already logged in");

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }

    if (!userRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(400).send('Invalid username or password');
    }

    next();
}

export {
    registerValidation,
    loginValidation,
}