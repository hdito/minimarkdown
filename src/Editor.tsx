import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { rootState } from './app/main';
import { EditMode } from './EditMode';
import { LoadingSpinner } from './LoadingSpinner';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { SaveMessage } from './components/SaveMessage';

export const Editor = () => {
  const params = useParams();
  const id = params.id as string;
  const text = useSelector((state: rootState) => state.texts.texts[id]);
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);
  const { state } = useLocation();
  const [draft, setDraft] = useState(text?.content ?? '');
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode ?? true);
  const { ready } = useTranslation('translation', { useSuspense: false });
  return (
    <div className="text-black dark:text-gray-50 min-h-screen flex flex-col bg-white dark:bg-gray-800">
      {!isLoading && ready ? (
        <>
          {isEditMode ? (
            <EditMode
              draft={draft}
              onChange={(e) => setDraft(e.currentTarget.value)}
              onShowPreview={() => setIsEditMode(false)}
            />
          ) : (
            <Preview draft={draft} onShowEditor={() => setIsEditMode(true)} />
          )}
          <Menu draft={draft} />
          <SaveMessage />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
