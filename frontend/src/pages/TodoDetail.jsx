import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTodo, updateTodo, toggleTodo, deleteTodo } from '../api'

const P = {
  high:   { label: 'High',   bg: '#fff2f2', color: '#ff3b30' },
  medium: { label: 'Medium', bg: '#fff8ec', color: '#ff9500' },
  low:    { label: 'Low',    bg: '#f0faf4', color: '#34c759' },
}
const getPriority = p => P[(p||'medium').toLowerCase()] || P.medium

export default function TodoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [todo, setTodo]       = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getTodo(id).then(t => { if(t){setTodo(t);setForm(t)} setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handleSave   = async () => { const u = await updateTodo(id, form); if(u){setTodo(u);setEditing(false)} }
  const handleToggle = async () => { const u = await toggleTodo(id); if(u) setTodo(u) }
  const handleDelete = async () => { if(window.confirm('Delete this task?')){ await deleteTodo(id); navigate('/') } }

  if (loading) return <div style={{ textAlign:'center', padding:'4rem', color:'#86868b' }}>Loading…</div>
  if (!todo)   return (
    <div style={{ textAlign:'center', padding:'4rem' }}>
      <p style={{ color:'#86868b', marginBottom:16 }}>Task not found.</p>
      <button onClick={() => navigate('/')} style={{
        padding:'10px 20px', background:'#0071e3', color:'#fff',
        border:'none', borderRadius:10, cursor:'pointer', fontSize:14,
      }}>Back to tasks</button>
    </div>
  )

  const pc = getPriority(todo.priority)
  const inp = {
    width:'100%', height:42, padding:'0 14px',
    border:'1px solid #d2d2d7', borderRadius:10,
    fontSize:14, background:'#fff',
  }

  return (
    <div style={{ maxWidth:720, margin:'0 auto', padding:'3rem 2rem' }}>

      {/* Breadcrumb */}
      <button onClick={() => navigate('/')} style={{
        display:'flex', alignItems:'center', gap:4, background:'none',
        border:'none', cursor:'pointer', color:'#0071e3', fontSize:14,
        marginBottom:'2rem', padding:0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        All tasks
      </button>

      {/* Main card */}
      <div style={{
        background:'#fff', borderRadius:20, overflow:'hidden',
        border:'1px solid rgba(0,0,0,0.06)',
        boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {/* Header band */}
        <div style={{
          padding:'2rem 2rem 1.5rem',
          borderBottom:'1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:'1rem' }}>
            <div style={{ flex:1 }}>
              {editing ? (
                <input value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})}
                  style={{ ...inp, fontSize:22, fontWeight:700, letterSpacing:'-0.02em', height:52 }} />
              ) : (
                <h1 style={{
                  fontSize:28, fontWeight:700, letterSpacing:'-0.03em', color:'#1d1d1f',
                  textDecoration: todo.done ? 'line-through' : 'none',
                  lineHeight:1.15,
                }}>{todo.title}</h1>
              )}
            </div>
            <div style={{ display:'flex', gap:8, flexShrink:0 }}>
              {!editing && (
                <button onClick={() => setEditing(true)} style={{
                  height:34, padding:'0 14px', background:'#f5f5f7',
                  border:'none', borderRadius:8, fontSize:13,
                  color:'#1d1d1f', cursor:'pointer', fontWeight:500,
                }}>Edit</button>
              )}
              <button onClick={handleDelete} style={{
                height:34, padding:'0 14px', background:'#fff2f2',
                border:'none', borderRadius:8, fontSize:13,
                color:'#ff3b30', cursor:'pointer', fontWeight:500,
              }}>Delete</button>
            </div>
          </div>

          {/* Badges */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
            <span style={{
              fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:20,
              background: pc.bg, color: pc.color,
            }}>{pc.label} priority</span>
            <span style={{
              fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:20,
              background: todo.done ? '#f0faf4' : '#f0f0ff',
              color: todo.done ? '#34c759' : '#0071e3',
            }}>{todo.done ? 'Completed' : 'Active'}</span>
            {(todo.tags||[]).map(tag => (
              <span key={tag} style={{
                fontSize:12, padding:'4px 10px', borderRadius:20,
                background:'#f5f5f7', color:'#6e6e73', fontWeight:500,
              }}>#{tag}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:'2rem' }}>
          {editing ? (
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={{ display:'block', fontSize:12, color:'#86868b', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Description</label>
              <textarea value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})}
                style={{ ...inp, height:100, padding:'12px 14px', resize:'vertical' }} />
            </div>
          ) : todo.description ? (
            <div style={{ marginBottom:'1.75rem' }}>
              <label style={{ display:'block', fontSize:12, color:'#86868b', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Description</label>
              <p style={{ fontSize:15, color:'#3a3a3c', lineHeight:1.6 }}>{todo.description}</p>
            </div>
          ) : null}

          {/* Meta grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:'1.75rem' }}>
            {[
              ['Due date',     todo.due || 'Not set'],
              ['Created',      (todo.createdAt||'').slice(0,10) || '—'],
              ['Last updated', (todo.updatedAt||'').slice(0,10) || '—'],
              ['Task ID',      todo.id || '—'],
            ].map(([label, value]) => (
              <div key={label} style={{ background:'#f5f5f7', borderRadius:12, padding:'1rem 1.25rem' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'#86868b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>{label}</div>
                <div style={{ fontSize:14, fontWeight:500, color:'#1d1d1f', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{value}</div>
              </div>
            ))}
          </div>

          {editing && (
            <div style={{ display:'flex', gap:10, marginBottom:'1.5rem' }}>
              <select value={form.priority||'medium'} onChange={e=>setForm({...form,priority:e.target.value})}
                style={{ ...inp, width:'auto', flex:1 }}>
                <option value="high">High priority</option>
                <option value="medium">Medium priority</option>
                <option value="low">Low priority</option>
              </select>
              <input type="date" value={form.due||''} onChange={e=>setForm({...form,due:e.target.value})}
                style={{ ...inp, width:'auto', flex:1 }} />
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display:'flex', gap:10 }}>
            {editing ? (
              <>
                <button onClick={handleSave} style={{
                  height:42, padding:'0 24px', background:'#0071e3',
                  color:'#fff', border:'none', borderRadius:10,
                  fontSize:14, fontWeight:500, cursor:'pointer',
                }}>Save changes</button>
                <button onClick={() => { setEditing(false); setForm(todo) }} style={{
                  height:42, padding:'0 18px', background:'#f5f5f7',
                  border:'none', borderRadius:10,
                  fontSize:14, color:'#1d1d1f', cursor:'pointer', fontWeight:500,
                }}>Cancel</button>
              </>
            ) : (
              <button onClick={handleToggle} style={{
                height:42, padding:'0 24px',
                background: todo.done ? '#f0f0ff' : '#0071e3',
                color: todo.done ? '#0071e3' : '#fff',
                border:'none', borderRadius:10,
                fontSize:14, fontWeight:500, cursor:'pointer',
                transition:'all 0.2s',
              }}>
                {todo.done ? 'Mark as active' : 'Mark as done'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}