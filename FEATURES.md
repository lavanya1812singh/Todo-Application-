# Features & Functionalities

## Frontend Features

### Todo List Page
| Feature | Description |
|---------|-------------|
| Stats Dashboard | Shows Total, Active, Completed, Overdue counts |
| Progress Bar | Visual progress bar showing % of tasks completed |
| Add Task Form | Form with title, description, priority, due date, tags |
| Search | Real-time search across title and description |
| Filters | Filter tabs: All, Active, Done, High Priority, Overdue |
| Inline Toggle | Click checkbox to mark done/undone without leaving page |
| Inline Delete | Delete button on each task row |
| Priority Badges | Color-coded badges: High (red), Medium (yellow), Low (green) |
| Due Date Display | Shows due date; highlights red if overdue |
| Tags | Comma-separated tags shown as pills |
| Navigation | Click any task to go to its detail page |

### Todo Detail Page
| Feature | Description |
|---------|-------------|
| URL Parameter | Receives todo ID via URL: /todos/:id |
| Full Detail View | Shows all fields: title, description, priority, status, due date, tags, timestamps, ID |
| Inline Edit | Edit title, description, priority, due date in place |
| Toggle Status | Button to mark as done or active |
| Delete | Permanently delete the todo |
| Back Navigation | Back button returns to list page |

### UI/UX
| Feature | Description |
|---------|-------------|
| Apple-inspired Design | Clean, minimal design inspired by apple.com |
| Sticky Navbar | Navbar stays at top while scrolling |
| Responsive Layout | Works on different screen widths |
| Hover Effects | Subtle hover animations on interactive elements |
| Footer | Multi-column footer with quick links |
| Empty State | Friendly message when no tasks found |
| Loading State | Loading indicator while fetching data |

## Backend Features

| Feature | Description |
|---------|-------------|
| CRUD API | Full Create, Read, Update, Delete for todos |
| Toggle Endpoint | Dedicated PATCH endpoint to toggle done status |
| File Persistence | Data saved to todos.json — survives server restarts |
| CORS | Cross-origin enabled for frontend on port 5173 |
| Query Filtering | Filter by priority, done status, or search keyword |
| UUID | Each todo gets a unique ID generated server-side |
| Timestamps | createdAt and updatedAt automatically managed |
| Error Handling | 404 responses for missing todos, 400 for missing title |
