import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const register = async (req: Request, res: Response): Promise<void> => {

  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400).json({ message: "Preencha todos os campos"});
  }
  
  try {
    const existingUser = await findUserByEmail(email);
    if(existingUser){
      res.status(400).json({ message: "E-mail já está em uso"});
    }

    console.log('Tentando registrar usuário:', req.body);
    await createUser(req.body);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login realizado com sucesso', token, email });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
