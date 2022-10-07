import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearSaveData, selectText } from './app/textsSlice';

export const SaveMessage = () => {
  const params = useParams();
  const id = params.id as string;

  const text = useSelector(selectText(id));
  const saveData = text?.save;
  const dispatch = useDispatch();
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
          className={`fixed top-4 right-4 p-2 rounded-md flex gap-2 items-center border-2 bg-white dark:bg-gray-800 ${
            saveData === true
              ? 'border-green-700 text-green-700 dark:border-green-400 dark:text-green-400'
              : 'border-red-700 text-red-700 dark:border-red-400 dark:text-red-400'
          }`}
        >
          {saveData === true ? 'Saved successfully' : 'Error on save'}{' '}
          <button
            className="text-2xl"
            onClick={() => dispatch(clearSaveData(id))}
          >
            <MdClose />
          </button>
        </div>
      )}
    </>
  );
};
