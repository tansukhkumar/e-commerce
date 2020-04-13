import * as express from 'express';
import * as bodyParser from 'body-parser';
import {userRoute} from './src/app/routes/userRoutes';
import * as dotenv from 'dotenv';
import { MongoConnect } from './src/app/db/db';
import { categoryRoutes } from './src/app/routes/categoryRoutes';
import { productRoutes } from './src/app/routes/productRoutess';
// deploying code purpush
import * as helmet from 'helmet';
import * as compression from 'compression';


dotenv.config();
var app = express();
// app deployee on heroku 
app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false})); 

app.use(bodyParser.json());



//app.get("/", (req,res) => res.send('this is get API'));

app.use('/user',userRoute);
app.use('/categories',categoryRoutes);
app.use('/product',productRoutes);
app.listen(process.env.PORT || 3000, () => {
    MongoConnect.connect().then(res  => console.log('database connection done'))
    console.log('server running on port 3000')
});