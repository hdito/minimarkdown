import { useTranslation } from 'react-i18next';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { rootState } from '@/app/main';
import { LanguageSelect } from '@/components/LanguageSelect';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ErrorTextsMessage } from './ErrorTextsMessage';

export const TextsLayout = () => {
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);

  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 py-2 text-black dark:bg-gray-800 dark:text-gray-100">
      <header className="mb-4 flex items-center gap-4">
        <h1 className="mr-auto cursor-default text-2xl font-bold sm:text-4xl">
          {t('texts')}
        </h1>
        <LanguageSelect />
        <Link to="/help" className="text-2xl">
          <IoHelpCircleOutline title={t('help')} />
        </Link>
        <ThemeSwitcher />
      </header>
      <div className="flex flex-1 flex-col content-start gap-4 pb-2 sm:flex-row sm:flex-wrap">
        {!isLoading ? (
          <Outlet />
        ) : (
          <div className="flex min-h-full flex-1 items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <ErrorTextsMessage />
    </div>
  );
};
