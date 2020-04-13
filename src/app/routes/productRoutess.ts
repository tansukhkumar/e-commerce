import { productController } from '../controller/productcontroller';
import { upload } from '../config/multer'
 
import * as express from 'express';

export  const productRoutes = express.Router();

productRoutes.get('/',productController.getProducts);
productRoutes.post('/addProduct',upload.single('file'),productController.saveProduct);
productRoutes.get('/:id',productController.getProductById);
productRoutes.post('/getProductCategory',productController.getProductByCategory);
productRoutes.put('/UpdateProduct',productController.updateProduct);
productRoutes.post('/findProduct',productController.searchProduct);