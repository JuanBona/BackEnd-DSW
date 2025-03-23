import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DI } from '../shared/db/orm.js';
import { Client } from '../client/client.entity.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const client = await DI.clientRepository.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, client.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: client.id, email: client.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token,
      client: {
        id: client.id,
        name: client.name,
        lastname: client.lastname,
        email: client.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
