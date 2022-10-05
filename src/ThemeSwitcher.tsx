import { useEffect, useState } from 'react';
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md';

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const [darkTheme, setDarkTheme] = useState(
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('prefers-color-scheme: dark').matches)
      ? true
      : false
  );
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      return;
    }
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }, [darkTheme]);
  return (
    <button
      className={`text-2xl ${className}`}
      onClick={() => setDarkTheme((prev) => !prev)}
    >
      {darkTheme ? (
        <MdOutlineModeNight title="Switch theme" />
      ) : (
        <MdOutlineLightMode title="Switch theme" />
      )}
    </button>
  );
};
