import { useEffect, useState } from 'react'
import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'
// ThemeToggle removed in favor of the in-page ActionMenu

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = window.localStorage.getItem('zomatoTheme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    window.localStorage.setItem('zomatoTheme', theme)
  }, [theme])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
