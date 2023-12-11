
interface User {
    _id: number;
    username: string;
    rating: number;
    wins: number;
    losses: number;
    friends: User[];
    friendRequests: User[];
    created_at: Date;
    updated_at: Date;
}

export default User;