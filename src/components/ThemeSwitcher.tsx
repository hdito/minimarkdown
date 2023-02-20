import { useThemeSwitcher } from '@/hooks/useThemeSwitcher';
import { useTranslation } from 'react-i18next';
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [darkTheme, setDarkTheme] = useThemeSwitcher();

  const { t } = useTranslation();

  return (
    <button
      className={`text-2xl ${className}`}
      onClick={() => setDarkTheme((prev) => !prev)}
    >
      {darkTheme ? (
        <MdOutlineModeNight title={t('switchTheme')} />
      ) : (
        <MdOutlineLightMode title={t('switchTheme')} />
      )}
    </button>
  );
};
