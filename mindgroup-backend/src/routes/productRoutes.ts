import express from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  updateStockController,
  getQuantityStockController
} from '../controllers/productController';

const router = express.Router();

router.post('/', createProductController);
router.get('/', getAllProductsController);
router.get('/:id/stock', getQuantityStockController);
router.get('/:id', getProductByIdController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);
router.patch('/:id/stock', updateStockController);

export default router;
