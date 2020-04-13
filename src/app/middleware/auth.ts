import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken'; 

export function validateUser(req: Request, res: Response, next: NextFunction){
    const token: any =  req.headers['x-access-token'];
    const private_key = process.env.PRIVATE_KEY || '';
    verify(token, private_key, (err: any, decoded: any) =>{
        if(err){
            res.status(401).json({
                status: 'failed',
                message: 'your session is expire',
                data: null
            })
        }
        else{
            req.body.userId = decoded.id;
            next();

        }
    })

 
}

// validateUser have request, response and in case user is valid we call next function
// to caal the validateUser is also require PRIVATE_KEY 
// when ever someone send s request they send a token to me in one of the header 