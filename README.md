# Todo-Application-

# TaskFlow — Todo Application

A full-stack todo application built with React (frontend) and Node.js/Express (backend).

## Live Demo
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

---

## Tech Stack

| Layer    | Technology              |
|----------|------------------------|
| Frontend | React 18, React Router v6, Vite |
| Backend  | Node.js, Express.js    |
| Storage  | JSON file (todos.json) |
| Styling  | Inline CSS (Apple-inspired design) |

---

## Project Structure

---

## Features

### Page 1 — Todo List (`/`)
- View all todos with live stats (Total, Active, Completed, Overdue)
- Overall progress bar showing completion percentage
- Add new todo with title, description, priority, due date, and tags
- Search todos by title or description
- Filter by: All, Active, Done, High Priority, Overdue
- Toggle todo done/undone inline with checkbox
- Delete a todo inline
- Click any todo to open its detail page
- Color-coded priority indicators (High/Medium/Low)
- Apple-inspired clean UI with sticky navbar and footer

### Page 2 — Todo Detail (`/todos/:id`)
- View full details of a single todo
- Todo ID is received as a URL parameter (`/todos/:id`)
- Displays: title, description, status, priority, due date, tags, created date, last updated, ID
- Edit all fields inline
- Toggle done/undone status
- Delete the todo (redirects back to list)

### Backend API
- RESTful CRUD API using Express.js
- Data persisted in a local JSON file
- CORS enabled for frontend communication

---

## API Reference

| Method | Endpoint                  | Description          | Request Body                        |
|--------|---------------------------|----------------------|-------------------------------------|
| GET    | /api/todos                | Get all todos        | —                                   |
| GET    | /api/todos/:id            | Get single todo      | —                                   |
| POST   | /api/todos                | Create a new todo    | `{ title, description, priority, due, tags }` |
| PUT    | /api/todos/:id            | Update a todo        | `{ title, description, priority, due, tags, done }` |
| PATCH  | /api/todos/:id/toggle     | Toggle done status   | —                                   |
| DELETE | /api/todos/:id            | Delete a todo        | —                                   |

### Query Parameters (GET /api/todos)
| Param    | Example         | Description              |
|----------|-----------------|--------------------------|
| priority | ?priority=high  | Filter by priority level |
| done     | ?done=false     | Filter by done status    |
| search   | ?search=cycling | Search by keyword        |

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation & Running

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

**2. Start the Backend**
```bash
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:4000

**3. Start the Frontend** (open a new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

> Both terminals must be running at the same time.

---

## Data Model

Each todo object has the following structure:

```json
{
  "id": "uuid-string",
  "title": "Task title",
  "description": "Optional description",
  "priority": "high | medium | low",
  "done": false,
  "due": "2026-07-01",
  "tags": ["design", "api"],
  "createdAt": "2026-06-28T10:00:00.000Z",
  "updatedAt": "2026-06-28T10:00:00.000Z"
}
```

---

## Documentation Files

| File | Description |
|------|-------------|
| README.md | Main project documentation |
| FEATURES.md | Detailed feature list |
| API.md | Full API documentation |
