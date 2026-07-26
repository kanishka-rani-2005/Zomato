import { useState } from 'react'
import UnifiedLogoutButton from '../pages/auth/UnifiedLogoutButton'


const ActionMenu = () => {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    try { window.localStorage.setItem('zomatoTheme', next ? 'dark' : 'light') } catch { /* ignore storage errors */ }
    setIsDark(next)
  }

  return (
    <div className="action-menu-shell">
      <button
        type="button"
        className="action-menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open actions"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="action-menu-menu" role="menu">
          <button
            type="button"
            className="action-menu-theme-btn"
            onClick={toggleTheme}
            role="menuitem"
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span className="theme-label">{isDark ? 'LightMode ' : 'DarkMode '}</span>
          </button>

          <div className="action-menu-item">
            <UnifiedLogoutButton />
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionMenu
