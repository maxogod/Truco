import "express-session";

declare module "express-session" {
    interface SessionData {
        user: {
            username: string; // this is enough to identify the user
        };
    }
}