import * as mongoose from 'mongoose';

export class MongoConnect{
   
    static connect(){
        const mongoDB = process.env.MONGODB_URL || '';
        return mongoose.connect(mongoDB,{ useUnifiedTopology: true, useNewUrlParser: true });
    }
}