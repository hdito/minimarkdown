import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { rootState } from '@/app/main';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SaveMessage } from '@/components/SaveMessage';
import { EditMode } from './EditMode';
import { Menu } from './Menu';
import { Preview } from './Preview';

export const Editor = () => {
  const params = useParams();
  const id = params.id as string;
  const { state } = useLocation();

  const text = useSelector((state: rootState) => state.texts.texts[id]);
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);

  const [draft, setDraft] = useState(text?.content ?? '');
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode ?? true);

  const { ready } = useTranslation('translation', { useSuspense: false });
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-gray-800 dark:text-gray-50">
      {text ? (
        <>
          {!isLoading && ready ? (
            <>
              {isEditMode ? (
                <EditMode
                  draft={draft}
                  onChange={(e) => setDraft(e.currentTarget.value)}
                  onShowPreview={() => setIsEditMode(false)}
                />
              ) : (
                <Preview
                  draft={draft}
                  onShowEditor={() => setIsEditMode(true)}
                />
              )}
              <Menu draft={draft} />
              <SaveMessage />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </>
      ) : (
        <div className="py-2 px-4">
          <h1 className="mb-4 text-2xl font-bold sm:text-4xl">
            {t('404.header')}
          </h1>
          <p>
            {t('404.description')}{' '}
            <Link className="underline" to="/">
              {t('404.mainMenu')}
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};
