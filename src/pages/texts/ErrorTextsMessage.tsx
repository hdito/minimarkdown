import { clearError } from '../../app/textsSlice';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../app/main';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiError } from 'react-icons/bi';

export const ErrorTextsMessage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: rootState) => state.texts.error);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <>
      {error !== null && (
        <div className="fixed bottom-4 max-w-full sm:max-w-[400px] left-1/2 -translate-x-1/2 flex items-center bg-white dark:bg-gray-800 border-4 rounded-md border-black dark:border-gray-50">
          <div className="px-1 py-0.5">
            <BiError className="text-4xl text-red-700 dark:text-red-500" />
          </div>
          <div className="flex gap-1 flex-col px-2 py-0.5 border-r-4 border-black dark:border-gray-50">
            <div className="font-bold">{t('error')}</div>
            <div>{t('errorMessage')}</div>
          </div>
          <button
            className="text-4xl px-2 py-1"
            onClick={() => dispatch(clearError())}
          >
            <MdClose title={t('close')} />
          </button>
        </div>
      )}
    </>
  );
};
