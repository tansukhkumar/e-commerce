import {Schema, model} from 'mongoose';
import {genSalt, hash} from 'bcryptjs';

const salt_Round : number | any = process.env.SALT_ROUND;
let userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        maxlength: 16
    },
    mobile:{
        type: String,
        trim: true,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: true
    },
    role:{
        type:String,
        required: true,
        trim : true,
        default: 'User'
    }

});

userSchema.pre('save', function(next){
    const user:any = this;
    if(user.isModified("password")){
        const saltRound = salt_Round
        genSalt(saltRound, (err, salt) => {
            hash(user.password,salt, (err,hash:any) => {
                if(err){
                    throw err
                }
                else{
                    user.password = hash;
                    next();
                }
            })
        })
    }
    else{
        next();
    }
})

export const  User = model('User',userSchema);
        