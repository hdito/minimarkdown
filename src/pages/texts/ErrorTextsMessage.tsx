import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiError } from 'react-icons/bi';
import { rootState } from '@/app/main';
import { clearError } from '@/app/textsSlice';

export const ErrorTextsMessage = () => {
  const error = useSelector((state: rootState) => state.texts.error);
  const dispatch = useDispatch();

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
        <div className="fixed bottom-4 left-1/2 flex max-w-full -translate-x-1/2 items-center rounded-md border-4 border-black bg-white dark:border-gray-50 dark:bg-gray-800 sm:max-w-[400px]">
          <div className="px-1 py-0.5">
            <BiError className="text-4xl text-red-700 dark:text-red-500" />
          </div>
          <div className="flex flex-col gap-1 border-r-4 border-black px-2 py-0.5 dark:border-gray-50">
            <div className="font-bold">{t('error')}</div>
            <div>{t('errorMessage')}</div>
          </div>
          <button
            className="px-2 py-1 text-4xl"
            onClick={() => dispatch(clearError())}
          >
            <MdClose title={t('close')} />
          </button>
        </div>
      )}
    </>
  );
};
