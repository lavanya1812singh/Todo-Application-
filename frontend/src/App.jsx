import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TodoList from './pages/TodoList'
import TodoDetail from './pages/TodoDetail'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  render() {
    if (this.state.hasError) return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: 'red', marginBottom: 8 }}>Error:</h2>
        <pre style={{ color: 'red', fontSize: 13 }}>{this.state.error?.message}</pre>
        <button onClick={() => this.setState({ hasError: false })}
          style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer' }}>
          Try again
        </button>
      </div>
    )
    return this.props.children
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/"          element={<TodoList />} />
              <Route path="/todos/:id" element={<TodoDetail />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}