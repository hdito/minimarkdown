import { FirestoreError } from 'firebase/firestore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearSaveData, selectText } from '@/app/textsSlice';

export const SaveMessage = () => {
  const expectedErrorCodes = ['permission-denied', 'resource-exhausted'];
  const params = useParams();
  const id = params.id as string;

  const text = useSelector(selectText(id));
  const saveData = text?.save;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(clearSaveData(id));
    return () => {
      dispatch(clearSaveData(id));
    };
  }, []);

  return (
    <>
      {saveData && (
        <div
          className={`fixed top-4 right-4 overflow-hidden rounded-md border-2 border-black bg-white dark:border-gray-50 dark:bg-gray-800 ${
            saveData === true ? 'flex items-center' : 'max-w-[200px]'
          }`}
        >
          {saveData === true ? (
            <>
              <div className="flex items-center gap-1 border-r-2 border-black px-2 py-1 dark:border-gray-50">
                <IoCheckmarkSharp className="text-xl" />
                <div>{t('saveSuccess')}</div>
              </div>
            </>
          ) : (
            <>
              <h2 className="px-2 pt-1 font-bold">{t('errorOnSave')}</h2>
              <div className="border-b-2 border-black px-2 pb-1">
                {saveData instanceof FirestoreError
                  ? expectedErrorCodes.includes(saveData.code)
                    ? t(`errorTip.${saveData.code}`)
                    : t('errorTip.unknown')
                  : t('errorTip.unknown')}
              </div>
            </>
          )}
          <button
            className="px-2 py-1 font-bold"
            onClick={() => dispatch(clearSaveData(id))}
          >
            {t('hide')}
          </button>
        </div>
      )}
    </>
  );
};
