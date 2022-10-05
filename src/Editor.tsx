import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { rootState } from './app/main';
import { EditMode } from './EditMode';
import { Menu } from './Menu';
import { Preview } from './Preview';

export const Editor = () => {
  const { id } = useParams();
  const text = useSelector((state: rootState) =>
    state.texts.texts.find((text) => text.id === id)
  );
  const { state } = useLocation();
  const [draft, setDraft] = useState(text?.content ?? '');
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode ?? true);
  return (
    <div className="text-gray-800 dark:text-gray-50 min-h-screen flex flex-col bg-white dark:bg-gray-800">
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
    </div>
  );
};
