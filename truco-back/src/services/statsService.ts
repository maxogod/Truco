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

const updateRatingService = async (username: string,iWon:boolean, myRating:number,opponentRating:number) => {
    const user = await User.findOne({ username });
    if (!user) return false;
    const gainedPoints = Math.min(Math.round(30/((2*myRating)/opponentRating)),30)
    if(iWon){
        user.rating += gainedPoints
    }else{
        user.rating -= gainedPoints
    }
    if(user.rating <= 0){
        user.rating = 1
    }
    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return false;
    }

    return user.rating;
}


const topRatingService = async () => {
    const users = await User.find({}).sort({rating:-1}).limit(20)
    return users

}

export {
    addWinOrLossService,
    updateRatingService,
    topRatingService
};