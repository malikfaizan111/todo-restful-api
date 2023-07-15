const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      // Validate the request body
      const { error } = userSchema.validate({ email, password });
      if (error) {
          return res.status(400).json({ error: error.details[0].message });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email: email, password: hashedPassword });
      return res.status(201).json({ user: user.email });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });
      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};