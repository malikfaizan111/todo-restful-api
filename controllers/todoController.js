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
      const todo = await req.user.createTodo({ title, description });
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const todos = await req.user.getTodos();
      return res.json(todos);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const todo = await req.user.getTodos({where: {id: req.params.id}});
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
      const todo = await req.user.getTodos({where: {id: req.params.id}});
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      console.log(todo[0].title);
      todo[0].title = title;
      todo[0].description = description;
      todo[0].completed = completed;
      await todo[0].save();
      return res.json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const todo = await req.user.getTodos({where: {id: req.params.id}});
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      await todo.destroy();
      return res.status(200).send('Successfully Deleted!!.');
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};