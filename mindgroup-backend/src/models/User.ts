import { db } from '../config/database';
import bcrypt from 'bcrypt';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    const user = rows as User[];
    return user.length > 0 ? user[0] : null;
  };

export const createUser = async (user: User): Promise<void> => {
  try {
    console.log('Criando usuário com os dados:', user); 

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.query(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashedPassword]
    );

    console.log('Usuário criado com sucesso');
  } catch (error) {
    console.error('Erro no modelo ao criar usuário:', error); 
    throw error;
  }
};
