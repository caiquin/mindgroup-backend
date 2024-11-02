import { db } from '../config/database';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const createProduct = async (product: Product): Promise<void> => {
  await db.query(
    'INSERT INTO product (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [product.name, product.description, product.price, product.stock]
  );
};

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await db.query('SELECT * FROM product');
  return rows as Product[];
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [id]);
  const products = rows as Product[];
  return products.length > 0 ? products[0] : null;
};

export const getProductByName = async (name: string): Promise<Product | null> => {
  const [rows] = await db.query('SELECT * FROM product WHERE name = ?', [name]);
  const products = rows as Product[];
  return products.length > 0 ? products[0] : null;
};

export const updateProduct = async (id: number, product: Product): Promise<void> => {
  await db.query(
    'UPDATE product SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
    [product.name, product.description, product.price, product.stock, id]
  );
};

export const deleteProduct = async (id: number): Promise<void> => {
  await db.query('DELETE FROM product WHERE id = ?', [id]);
};

export const updateStock = async (id: number, quantity: number): Promise<void> => {
  await db.query('UPDATE product SET stock = ? WHERE id = ?', [quantity, id]);
};

export const getQuantityStock = async (id: number): Promise<Product | undefined> =>{
  const [rows] = await db.query('SELECT stock FROM product where id = ?', [id]);
  const products = rows as Product[];
  return products.length > 0 ? products[0] : undefined;
}
