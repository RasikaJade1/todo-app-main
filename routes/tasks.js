const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.render('index', { tasks });
});

router.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (title) {
    const task = new Task({ title });
    await task.save();
  }
  res.redirect('/');
});

router.get('/tasks/:id/edit', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.render('edit', { task });
});

router.post('/tasks/:id', async (req, res) => {
  const { title, completed } = req.body;
  await Task.findByIdAndUpdate(req.params.id, {
    title,
    completed: completed === 'on',
  });
  res.redirect('/');
});

router.post('/tasks/:id/delete', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;