import { useTranslation } from 'react-i18next';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { rootState } from './app/main';
import { ErrorTextsMessage } from './ErrorTextsMessage';
import { LanguageSelect } from './LanguageSelect';
import { LoadingSpinner } from './LoadingSpinner';
import { ThemeSwitcher } from './ThemeSwitcher';

export const TextsLayout = () => {
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-gray-100">
      <header className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl sm:text-4xl font-bold mr-auto cursor-default">
          {t('texts')}
        </h1>
        <LanguageSelect />
        <Link to="/help" className="text-2xl">
          <IoHelpCircleOutline title={t('help')} />
        </Link>
        <ThemeSwitcher />
      </header>
      <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:flex-wrap pb-2">
        {!isLoading ? (
          <Outlet />
        ) : (
          <div className="min-h-full flex flex-1 justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <ErrorTextsMessage />
    </div>
  );
};
