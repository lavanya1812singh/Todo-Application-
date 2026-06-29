const BASE = 'http://localhost:4000/api'

export const getTodos = async (params = {}) => {
  try {
    const res = await fetch(`${BASE}/todos?${new URLSearchParams(params)}`)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('getTodos failed:', e)
    return []
  }
}

export const getTodo = async (id) => {
  try {
    const res = await fetch(`${BASE}/todos/${id}`)
    return await res.json()
  } catch (e) {
    console.error('getTodo failed:', e)
    return null
  }
}

export const createTodo = async (body) => {
  try {
    const res = await fetch(`${BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return await res.json()
  } catch (e) {
    console.error('createTodo failed:', e)
    return null
  }
}

export const updateTodo = async (id, body) => {
  try {
    const res = await fetch(`${BASE}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return await res.json()
  } catch (e) {
    console.error('updateTodo failed:', e)
    return null
  }
}

export const toggleTodo = async (id) => {
  try {
    const res = await fetch(`${BASE}/todos/${id}/toggle`, { method: 'PATCH' })
    return await res.json()
  } catch (e) {
    console.error('toggleTodo failed:', e)
    return null
  }
}

export const deleteTodo = async (id) => {
  try {
    await fetch(`${BASE}/todos/${id}`, { method: 'DELETE' })
    return true
  } catch (e) {
    console.error('deleteTodo failed:', e)
    return false
  }
}