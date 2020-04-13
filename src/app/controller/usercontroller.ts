import {Request,Response,NextFunction, Errback} from 'express';
import { User } from '../models/user';
// for checking password as password is encrypted
import { compareSync } from 'bcryptjs'
// JWT method sign
import { sign } from 'jsonwebtoken';


export class UserController{
// user login controller

   static login(req:Request, res:Response, next:NextFunction) {
    // JWT private key 
        const  private_key: string = process.env.PRIVATE_KEY || '';

    // find one email whare 
         User.findOne({ email : req.body.email} , (err: Errback, result: any) =>{
             if(err){
                 res.status(500).json({ status : 'failed' , message: err})
             }
             else{
                //  checking user have any value or not  like null value avoid
                 if(result != undefined) {
                    //  compareing encrypted password return boolean value
                     if(compareSync(req.body.password, result.password)){
                        const token = sign({ id: result._id}, private_key, { expiresIn : '1h'} )
                         res.json({ status : 'success', message: 'Login success!', data: token})
                     }
                     else{
                        res.json({ status : 'failed', message: 'Username Or Password is Incorrect!'})
                     }
                 }else{
                    res.json({ status : 'failed', message: 'Username Or Password is Incorrect!'})
                 }
             }
         });
        //  we are getting one record from user collection where user email is send by the user 
        // in our case it will be a angular from. then we compareing hash password with syn password
    }

    static registration(req:Request, res:Response, next:NextFunction){  
        const user = new User(req.body);
        User.create(user, (err:Errback, result:any) => {
            if(err){
                res.status(500).json(
                    { status: 'failed', message:err}
                )
            }
            else{
                res.json(
                    { status: 'success', message: 'Registation Successfull', data: result}
                    )
            }
        } )
    }

    static updateProfile(req:Request, res:Response, next:NextFunction){ 
        // we called a Find By Id Update Method where we send the 1st perameter as userId
        // which we are going to get from the middle ware (validateUser (auth.ts)) after that 
        // if it is successfull we are seting the values (updateing properties like firstName,
        // lastName & address) if success status is fine if not err genrated  
        
         
        User.findByIdAndUpdate( req.body.userId,{
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address
            }
        }, (err: Errback, result: any) => {
            if(err){
                res.status(500).json({
                    status: 'failed',
                    message: err
                })
            }
            else{
                res.json({
                    status: 'success',
                    message: 'profile updated successfully !',
                    data: result
                })
            }
        })
    }

    static getProfile(req: Request, res: Response, next: NextFunction){
        const userId = req.body.userId;
        User.findById(userId, (err: Errback, result: any) =>{
            if(err) {
                res.status(500).json({status: 'failed' ,message:err})
            }
            else{
                res.json({status: 'success', message:'user profile', data : result})
            }
        })
    }

    
}