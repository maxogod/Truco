import User from "../models/User"

const addWinOrLossService = async (username: string, win: boolean) => {
    const user = await User.findOne({ username });
    if (!user) return false;

    if (win) {
        user.wins += 1;
    } else {
        user.losses += 1;
    }

    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

const updateRatingService = async (username: string, ratingDifferential: number) => {
    const user = await User.findOne({ username });
    if (!user) return false;

    user.rating += ratingDifferential;

    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

export {
    addWinOrLossService,
    updateRatingService,
};