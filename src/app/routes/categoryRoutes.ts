import { CategoryController } from './../controller/categorycontroller';
import * as express from 'express';

export const categoryRoutes = express.Router();

categoryRoutes.get('/allCategory',CategoryController.getCategories);
categoryRoutes.post('/addCategory',CategoryController.saveCategories);