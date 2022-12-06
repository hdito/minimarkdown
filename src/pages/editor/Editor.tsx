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
  const text = useSelector((state: rootState) => state.texts.texts[id]);
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);
  const { state } = useLocation();
  const [draft, setDraft] = useState(text?.content ?? '');
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode ?? true);
  const { ready } = useTranslation('translation', { useSuspense: false });
  const { t } = useTranslation();
  return (
    <div className="text-black dark:text-gray-50 min-h-screen flex flex-col bg-white dark:bg-gray-800">
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
            <div className="flex-1 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </>
      ) : (
        <div className="py-2 px-4">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">
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
