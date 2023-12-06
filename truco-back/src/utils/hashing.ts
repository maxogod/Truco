import bcrypt from "bcryptjs";

function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

export { hashPassword, comparePassword };