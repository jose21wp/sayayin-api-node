import { Request, Response } from 'express';
import UserModel from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '8h' }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  }
};

export default AuthController;