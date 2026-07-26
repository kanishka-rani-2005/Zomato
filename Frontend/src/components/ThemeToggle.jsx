import './ThemeToggle.css';

const ThemeToggle = ({ theme, setTheme }) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
    </button>
  );
};

export default ThemeToggle;
