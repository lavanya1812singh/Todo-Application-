# API Documentation

Base URL: `http://localhost:4000/api`

---

## Endpoints

### GET /todos
Returns all todos. Supports optional query parameters.

**Query Parameters:**
- `?priority=high` — filter by priority (high/medium/low)
- `?done=false` — filter by done status (true/false)
- `?search=keyword` — search by title or description

**Response:**
```json
[
  {
    "id": "abc-123",
    "title": "Design homepage",
    "description": "Create wireframes",
    "priority": "high",
    "done": false,
    "due": "2026-07-01",
    "tags": ["design", "ui"],
    "createdAt": "2026-06-28T10:00:00.000Z",
    "updatedAt": "2026-06-28T10:00:00.000Z"
  }
]
```

---

### GET /todos/:id
Returns a single todo by ID.

**Response:** Single todo object or `{ "error": "Todo not found" }`

---

### POST /todos
Creates a new todo.

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Optional",
  "priority": "medium",
  "due": "2026-07-10",
  "tags": ["work", "urgent"]
}
```

**Response:** Created todo object with generated `id`, `createdAt`, `updatedAt`.

---

### PUT /todos/:id
Updates an existing todo.

**Request Body:** Any fields to update.

**Response:** Updated todo object.

---

### PATCH /todos/:id/toggle
Toggles the `done` status of a todo.

**Response:** Updated todo object with flipped `done` value.

---

### DELETE /todos/:id
Deletes a todo permanently.

**Response:** `204 No Content`
