const Todo = require('../Models/todo');
const Joi = require('joi');

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = {
  async create(req, res) {
    try {
      const { title, description } = req.body;
            // Validate the request body
            const { error } = todoSchema.validate({ title, description });
            if (error) {
              return res.status(400).json({ error: error.details[0].message });
            }
      const todo = await Todo.create({ title, description });
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const todos = await Todo.findAll();
      return res.json(todos);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return res.json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const { title, description, completed } = req.body;
      const todo = await Todo.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      todo.title = title;
      todo.description = description;
      todo.completed = completed;
      await todo.save();
      return res.json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      await todo.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};