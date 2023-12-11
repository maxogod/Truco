import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${req.method}] ${req.url}`);
    res.on("finish", () => {
        console.log(`STATUS ${res.statusCode}`);
    });
    next();
}

export default requestLogger;