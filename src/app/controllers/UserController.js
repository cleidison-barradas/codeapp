import User from '../models/User';

class UserController {
    async index(req, res) {
        const { is_admin } = await User.findByPk(req.User_id);

        if (!is_admin) {
            return res.status(401).json({ error: 'User does not permission' });
        }

        const user = await User.findAll();
        return res.json(user);
    }

    async store(req, res) {
        const UserExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (UserExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async show(req, res) {
        const { id, name, email } = await User.findByPk(req.params);

        return res.json({
            id,
            name,
            email
        });
    }

    async Delete(req, res) {
        const user = await User.findByPk(req.params);

        if (!user) {
            return res.status(400).json({ error: 'user does not found' });
        }
        await User.destroy();

        return res.status(200).json({ message: 'OK' });
    }
}
export default new UserController();
