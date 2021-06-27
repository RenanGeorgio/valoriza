import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).end();
    }

    const [ _, token] = authToken.split(" ");
    
    try{
        const { sub } = verify(token, "dd56667c5cc4f6e4ed0ba9e4117249e7") as IPayload;

        request.user_id = sub;
        
        return next();
    }catch(err){
        return response.status(401).end();
    }
    
}