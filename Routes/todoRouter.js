const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/', todoController.create);
router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;