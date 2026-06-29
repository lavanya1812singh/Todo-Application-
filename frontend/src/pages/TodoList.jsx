import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../api'

const P = {
  high:   { label: 'High',   bg: '#fff2f2', color: '#ff3b30', dot: '#ff3b30' },
  medium: { label: 'Medium', bg: '#fff8ec', color: '#ff9500', dot: '#ff9500' },
  low:    { label: 'Low',    bg: '#f0faf4', color: '#34c759', dot: '#34c759' },
}

const getPriority = (p) => P[(p||'medium').toLowerCase()] || P.medium

export default function TodoList() {
  const [todos, setTodos]       = useState([])
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState({ title:'', description:'', priority:'medium', due:'', tags:'' })
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    getTodos()
      .then(d => { setTodos(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => { setTodos([]); setLoading(false) })
  }
  useEffect(() => { load() }, [])

  const today = new Date().toISOString().slice(0,10)
  const isOverdue = t => !t.done && t.due && t.due < today

  const visible = todos.filter(t => {
    const q = search.toLowerCase()
    if (q && !t.title.toLowerCase().includes(q) && !(t.description||'').toLowerCase().includes(q)) return false
    if (filter==='active')  return !t.done
    if (filter==='done')    return t.done
    if (filter==='high')    return (t.priority||'').toLowerCase()==='high'
    if (filter==='overdue') return isOverdue(t)
    return true
  })

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    await createTodo({ ...form, tags: form.tags.split(',').map(s=>s.trim()).filter(Boolean) })
    setForm({ title:'', description:'', priority:'medium', due:'', tags:'' })
    setShowForm(false)
    load()
  }

  const handleToggle = async (e, id) => { e.stopPropagation(); await toggleTodo(id); load() }
  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (window.confirm('Delete this task?')) { await deleteTodo(id); load() }
  }

  const filters = [
    { key:'all', label:'All' },
    { key:'active', label:'Active' },
    { key:'done', label:'Done' },
    { key:'high', label:'High priority' },
    { key:'overdue', label:'Overdue' },
  ]

  const inp = {
    width: '100%', height: 44, padding: '0 14px',
    border: '1px solid #d2d2d7', borderRadius: 10,
    fontSize: 14, background: '#fff', transition: 'all 0.2s',
  }

  const done  = todos.filter(t => t.done).length
  const active = todos.filter(t => !t.done).length
  const pct   = todos.length ? Math.round((done / todos.length) * 100) : 0

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>

      {/* Hero */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          Task Manager
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f', lineHeight: 1.05, marginBottom: 12 }}>
          Get things done.
        </h1>
        <p style={{ fontSize: 17, color: '#6e6e73', fontWeight: 400, maxWidth: 480, lineHeight: 1.5 }}>
          Track, prioritise, and complete your tasks — all in one beautiful place.
        </p>
      </div>

      {/* Progress + Stats */}
      <div style={{
        background: '#fff', borderRadius: 20, padding: '1.75rem 2rem',
        marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: 13, color: '#6e6e73', marginBottom: 4 }}>Overall progress</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
              {pct}<span style={{ fontSize: 18, fontWeight: 400, color: '#6e6e73' }}>%</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { val: todos.length, lbl: 'Total',     color: '#1d1d1f' },
              { val: active,       lbl: 'Active',    color: '#0071e3' },
              { val: done,         lbl: 'Done',      color: '#34c759' },
              { val: todos.filter(isOverdue).length, lbl: 'Overdue', color: '#ff3b30' },
            ].map(({ val, lbl, color }) => (
              <div key={lbl} style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color }}>{val}</div>
                <div style={{ fontSize: 12, color: '#86868b', marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 6, background: '#f5f5f7', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: 'linear-gradient(90deg, #0071e3, #34c759)',
            borderRadius: 3, transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* Search + Add */}
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: '#86868b', pointerEvents: 'none',
          }} width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks…"
            style={{ ...inp, paddingLeft: 42 }}
          />
        </div>
        <button onClick={() => setShowForm(f => !f)} style={{
          height: 44, padding: '0 22px',
          background: showForm ? '#0077ed' : '#0071e3',
          color: '#fff', border: 'none', borderRadius: 10,
          fontSize: 14, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'background 0.2s', whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New task
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{
          background: '#fff', borderRadius: 20, padding: '1.75rem',
          marginBottom: '1.5rem', border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            New task
          </div>
          <form onSubmit={handleCreate}>
            <input required placeholder="Task title"
              value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              style={{ ...inp, marginBottom: 10, fontSize: 15 }}
            />
            <textarea placeholder="Add a description…"
              value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              style={{
                width: '100%', minHeight: 80, padding: '12px 14px',
                border: '1px solid #d2d2d7', borderRadius: 10, fontSize: 14,
                background: '#fff', resize: 'vertical', marginBottom: 10,
                transition: 'all 0.2s', lineHeight: 1.5,
              }}
            />
            <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem' }}>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                style={{ ...inp, width: 'auto', flex: 1 }}>
                <option value="high">🔴 High priority</option>
                <option value="medium">🟡 Medium priority</option>
                <option value="low">🟢 Low priority</option>
              </select>
              <input type="date" value={form.due} onChange={e => setForm({...form, due: e.target.value})}
                style={{ ...inp, width: 'auto', flex: 1 }} />
              <input placeholder="Tags: design, api…" value={form.tags}
                onChange={e => setForm({...form, tags: e.target.value})}
                style={{ ...inp, flex: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{
                height: 38, padding: '0 18px', background: '#f5f5f7',
                border: 'none', borderRadius: 8, fontSize: 14, color: '#1d1d1f',
                cursor: 'pointer', fontWeight: 500,
              }}>Cancel</button>
              <button type="submit" style={{
                height: 38, padding: '0 22px', background: '#0071e3',
                border: 'none', borderRadius: 8, fontSize: 14, color: '#fff',
                cursor: 'pointer', fontWeight: 500,
              }}>Save task</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
            background: filter===f.key ? '#1d1d1f' : '#fff',
            color: filter===f.key ? '#fff' : '#6e6e73',
            boxShadow: filter===f.key ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Task list */}
      {loading ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'#86868b' }}>Loading…</div>
      ) : visible.length === 0 ? (
        <div style={{
          textAlign:'center', padding:'5rem 2rem',
          background:'#fff', borderRadius:20,
          border:'1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize:48, marginBottom:12 }}>✓</div>
          <div style={{ fontSize:17, fontWeight:600, color:'#1d1d1f', marginBottom:6 }}>
            {filter==='done' ? 'No completed tasks yet' : 'All clear'}
          </div>
          <div style={{ fontSize:14, color:'#86868b' }}>
            {filter==='all' ? 'Add a task to get started.' : 'No tasks match this filter.'}
          </div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {visible.map((t, i) => {
            const pc = getPriority(t.priority)
            return (
              <div key={t.id} onClick={() => navigate(`/todos/${t.id}`)}
                style={{
                  background:'#fff', padding:'1rem 1.25rem',
                  display:'flex', alignItems:'center', gap:14, cursor:'pointer',
                  borderRadius: i===0 ? '14px 14px 4px 4px' : i===visible.length-1 ? '4px 4px 14px 14px' : '4px',
                  border:'1px solid rgba(0,0,0,0.06)',
                  marginBottom: 1, transition:'background 0.15s',
                  opacity: t.done ? 0.55 : 1,
                }}
                onMouseEnter={e => e.currentTarget.style.background='#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background='#fff'}
              >
                {/* Checkbox */}
                <div onClick={e => handleToggle(e, t.id)} style={{
                  width:22, height:22, borderRadius:'50%', flexShrink:0,
                  border: t.done ? 'none' : '1.5px solid #d2d2d7',
                  background: t.done ? '#34c759' : 'transparent',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', transition:'all 0.2s',
                }}>
                  {t.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="3" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </div>

                {/* Priority dot */}
                <div style={{
                  width:8, height:8, borderRadius:'50%',
                  background: pc.dot, flexShrink:0,
                }} />

                {/* Content */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontSize:15, fontWeight:500, color:'#1d1d1f',
                    textDecoration: t.done ? 'line-through' : 'none',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    letterSpacing:'-0.01em',
                  }}>{t.title}</div>
                  {t.description && (
                    <div style={{
                      fontSize:13, color:'#86868b', marginTop:2,
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    }}>{t.description}</div>
                  )}
                </div>

                {/* Meta */}
                <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                  {(t.tags||[]).slice(0,2).map(tag => (
                    <span key={tag} style={{
                      fontSize:11, padding:'2px 8px', borderRadius:20,
                      background:'#f5f5f7', color:'#6e6e73', fontWeight:500,
                    }}>#{tag}</span>
                  ))}
                  {t.due && (
                    <span style={{
                      fontSize:12, color: isOverdue(t) ? '#ff3b30' : '#86868b',
                      fontWeight: isOverdue(t) ? 600 : 400,
                    }}>{t.due}</span>
                  )}
                  <span style={{
                    fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:20,
                    background: pc.bg, color: pc.color,
                  }}>{pc.label}</span>
                  <button onClick={e => handleDelete(e, t.id)} style={{
                    width:26, height:26, border:'none', background:'none', borderRadius:6,
                    cursor:'pointer', color:'#86868b', fontSize:16,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background='#fff2f2'; e.currentTarget.style.color='#ff3b30' }}
                    onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#86868b' }}
                  >✕</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}