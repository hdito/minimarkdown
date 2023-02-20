import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type useThemeSwitcherOutput = [boolean, Dispatch<SetStateAction<boolean>>];

export const useThemeSwitcher = (): useThemeSwitcherOutput => {
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

  return [darkTheme, setDarkTheme];
};
