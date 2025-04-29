const request = require('supertest');
const app = require('../app');
const Task = require('../models/Task');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true); // Suppress deprecation warning

describe('Tasks Routes', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 10000); // Increase timeout to 10 seconds

  afterEach(async () => {
    await Task.deleteMany({});
  }, 10000); // Increase timeout to 10 seconds

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000); // Increase timeout to 10 seconds

  it('should delete a task', async () => {
    // Create a task
    const task = await Task.create({ title: 'Test Task', completed: false });
    // Delete the task using POST /tasks/:id/delete
    const res = await request(app).post(`/tasks/${task._id}/delete`);
    expect(res.status).toBe(302); // Expect redirect after deletion
    // Verify task is deleted
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  }, 10000); // Increase timeout for the test
});