import mongoose from "mongoose";

const destroySession = async (sid: string) => {
    try {
        const objId = new mongoose.Types.ObjectId(sid);
        await mongoose.connection.db.collection("sessions").deleteOne({ _id: objId });
    } catch (err) {
        console.log(err);
    }
}

export {
    destroySession,
}