const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const DB_FILE = path.join(__dirname, 'todos.json');

app.use(cors());
app.use(express.json());

// helpers
function readTodos() {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeTodos(todos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos  (optional ?priority=high, ?done=false)
app.get('/api/todos', (req, res) => {
  let todos = readTodos();
  const { priority, done, search } = req.query;
  if (priority)  todos = todos.filter(t => t.priority === priority);
  if (done !== undefined) todos = todos.filter(t => String(t.done) === done);
  if (search)    todos = todos.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );
  res.json(todos);
});

// GET single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = readTodos().find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST create todo
app.post('/api/todos', (req, res) => {
  const { title, description = '', priority = 'medium', due = null, tags = [] } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const todo = {
    id: uuidv4(),
    title,
    description,
    priority,
    done: false,
    due,
    tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const todos = readTodos();
  todos.push(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
  todos[idx] = { ...todos[idx], ...req.body, id: todos[idx].id, updatedAt: new Date().toISOString() };
  writeTodos(todos);
  res.json(todos[idx]);
});

// PATCH toggle done
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  todo.done = !todo.done;
  todo.updatedAt = new Date().toISOString();
  writeTodos(todos);
  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
  todos.splice(idx, 1);
  writeTodos(todos);
  res.status(204).send();
});

app.listen(4000, () => console.log('API running on http://localhost:4000'));