import { Product } from './../models/product';
import { categoryRoutes } from './../routes/categoryRoutes';
import { Request, Response, NextFunction, Errback} from "express";
import * as multer from 'multer';

export class productController {

    static getProducts(req: Request, res: Response, next: NextFunction){
        Product.find({}, (err: Errback, result: any) =>{
            if(err){
                res.status(500).json({ststus: 'failed', message: err})
            }
            else{
                res.json({status: 'Suceess', message: 'Product Found !', data: result})
            }
        })
    }

    static saveProduct(req: Request, res: Response, next: NextFunction){
        req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;
        
        const product = new Product(req.body);
        Product.create(product, (err: Errback, result: any) => {
            if(err){
                res.status(500).json({status: 'failed', message: err})
            }
            else{
                res.json({status: 'sucess', message: 'Product Added !', data: result})
            }
        })
    }

    static getProductById(req: Request, res: Response, next: NextFunction){
        const productId = req.params.id;
        Product.findById(productId, (err: Errback, result: any) => {
            if(err){
                res.status(500).json({status: 'failed', message: err})
            }
            else{
                res.json({status: 'success', message: 'Product Found!', data: result})
            }
        })

    }

    static getProductByCategory(req: Request, res: Response, next: NextFunction){
        const category = req.body.category;
        let productCount = 0;
        Product.find().estimatedDocumentCount().exec((err: Errback, result: any) => {
            productCount = result;
            Product.find({category: category}, (err: Errback, result: any) =>{
                if(err){
                    res.status(500).json({status:'failed', message: err})
                }
                else{
                    res.json({status:'success', 
                    message:'products found !', 
                    data: result, count: productCount})
                }
            });
        });
       
    }

    static updateProduct(req: Request, res: Response, next: NextFunction){
        Product.findByIdAndUpdate(req.body._id, {
            $set: {
            description: req.body.description,
            price: req.body.price,
            outOfStock: req.body.outOfStock
        }
    },(err: Errback, result: any) => {
        if(err){
            res.status(500).json({status: 'failed', message: err})
        }
        else{
            res.json({status:'success', message: 'Product Updated !', data: result})
        }
    });
        
    } 

    static searchProduct(req: Request, res: Response, next: NextFunction){
        const productName = req.body.productName;
        let productCount = 0;
        Product.find().estimatedDocumentCount().exec((err:Errback, result: any) =>{
            productCount = result;
            Product.find({productName : { $regex: productName, $options: 'i'} },
            (err: Errback, result: any) =>{
                 if(err){
                     res.status(500).json({status: 'failed', message: err})
                 }
                 else{
                    res.json({status: 'success', 
                    message: 'Product availble',
                    data: result, count: productCount})
                 }
            })
        });
    }
}