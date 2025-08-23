// ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDark(prev => !prev)}
      aria-label="Cambiar modo"
      className={`
        px-3 py-1 rounded transition-colors
        ${dark 
          ? 'bg-gray-800 text-white hover:bg-gray-700' 
          : 'bg-yellow-400 text-black hover:bg-yellow-300'
        }
      `}
    >
      {dark ? '🌙 Modo oscuro' : '☀️ Modo claro'}
    </button>
  );
}
