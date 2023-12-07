import mongoose from "mongoose";

const destroySession = async (sid: string) => {
    try {
        await mongoose.connection.db.collection("sessions").deleteOne({ _id: sid as any });
    } catch (err) {
        console.log(err);
    }
}

export {
    destroySession,
}