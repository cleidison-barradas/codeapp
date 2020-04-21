import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      return res.status(401).json({ error: 'user not found' });
    }
    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'user not found' });
    }
    const { id, name, is_admin } = userExists;

    return res.json({
      user: {
        id,
        name,
        email,
        is_admin
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  }
}
export default new SessionController();
