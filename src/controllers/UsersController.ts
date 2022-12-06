import { Request, Response } from 'express';
import UsersRepo from '../repo/Users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UsersController {
  async Login(req: Request, res: Response) {
    try {
      const credentials: { email: string; password: string } = req.body;
      const user = await UsersRepo.FindByEmail(credentials.email);

      if (!user)
        return res.status(400).send({ error: 'E-mail ou senha inválidos' });

      const verifyPass = await bcrypt.compare(
        credentials.password,
        user.password
      );

      if (!verifyPass)
        return res.status(400).send({ error: 'E-mail ou senha inválidos' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS || '', {
        expiresIn: '8h',
      });

      user.password = '';

      return res.status(200).send({ user, token });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}

export default new UsersController();
