export default function Footer() {
  const cols = [
    {
      heading: 'TaskFlow',
      links: ['All Tasks', 'Active Tasks', 'Completed', 'Overdue', 'High Priority'],
    },
    {
      heading: 'Features',
      links: ['Task Management', 'Priority Levels', 'Due Dates', 'Tags & Labels', 'Search & Filter'],
    },
    {
      heading: 'Account',
      links: ['Profile', 'Settings', 'Notifications', 'Data Export', 'Help Center'],
    },
    {
      heading: 'Developer',
      links: ['API Docs', 'GitHub Repo', 'Changelog', 'Report a Bug', 'Contributing'],
    },
    {
      heading: 'About',
      links: ['About Us', 'Privacy Policy', 'Terms of Use', 'Accessibility', 'Contact'],
    },
  ]

  return (
    <footer style={{
      background: '#f5f5f7',
      borderTop: '1px solid #d2d2d7',
      marginTop: '4rem',
    }}>
      {/* Quick links bar */}
      <div style={{
        maxWidth: 980, margin: '0 auto',
        padding: '2rem 2rem 1.5rem',
        borderBottom: '1px solid #d2d2d7',
      }}>
        <p style={{ fontSize: 13, color: '#6e6e73', marginBottom: '1rem', fontWeight: 500 }}>
          Quick Links
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['All Tasks', 'Add New Task', 'High Priority', 'Overdue Tasks', 'Completed'].map(link => (
            <button key={link} style={{
              padding: '7px 18px', borderRadius: 20,
              border: '1px solid #d2d2d7', background: 'transparent',
              fontSize: 13, color: '#1d1d1f', cursor: 'pointer',
              fontWeight: 400, transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8e8ed'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >{link}</button>
          ))}
        </div>
      </div>

      {/* Main footer links */}
      <div style={{
        maxWidth: 980, margin: '0 auto',
        padding: '2rem',
        borderBottom: '1px solid #d2d2d7',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '2rem',
        }}>
          {cols.map(col => (
            <div key={col.heading}>
              <p style={{
                fontSize: 12, fontWeight: 600, color: '#1d1d1f',
                marginBottom: '0.75rem', letterSpacing: '-0.01em',
              }}>{col.heading}</p>
              {col.links.map(link => (
                <p key={link} style={{
                  fontSize: 12, color: '#6e6e73', marginBottom: '0.5rem',
                  cursor: 'pointer', transition: 'color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0071e3'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
                >{link}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 980, margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5,
            background: '#1d1d1f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <span style={{ fontSize: 12, color: '#6e6e73' }}>
            Copyright © 2026 TaskFlow. All rights reserved.
          </span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Sitemap'].map(item => (
            <span key={item} style={{
              fontSize: 12, color: '#6e6e73', cursor: 'pointer', transition: 'color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#1d1d1f'}
              onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
            >{item}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}