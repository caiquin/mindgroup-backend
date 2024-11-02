import { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getProductByName,
  getQuantityStock
} from '../models/Product';

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

export const updateProductController = async (req: Request, res: Response) => {  
    try {
    await updateProduct(Number(req.params.id), req.body);
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    await deleteProduct(Number(req.params.id));
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

export const updateStockController = async (req: Request, res: Response) => {
  try {
    const { stock } = req.body;
    await updateStock(Number(req.params.id), stock);
    res.status(200).json({ message: 'Estoque atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    res.status(500).json({ error: 'Erro ao atualizar estoque' });
  }
};

export const getQuantityStockController = async (req: Request,  res: Response) => {
  try{
    const productId = Number(req.params.id);
    const stock = await getQuantityStock(productId)

    if(stock !== undefined){
      res.status(200).json({stock});
    }
    else{
      res.status(404).json({ message: 'Produto não encontrado'});
    }

  } catch(error) {
    console.error('Erro ao consultar estoque', error);
    res.status(500).json({ error: 'Erro ao consultar estoque'});
  }
}


export const createProductController = async (req: Request, res: Response) => {
   
    console.log('Tentando registrar usuário:', req.body); // Log do pedido recebido
   
    const { name, description, price, stock } = req.body;

    try {
        const existingProduct = await getProductByName(name);
        if(existingProduct){
            res.status(400).json({ message: "Já existe um produto com esse nome"});
        }

        await createProduct(req.body);
        res.status(201).json({ message: 'Produto criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};


