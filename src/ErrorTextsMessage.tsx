import { clearError } from './app/textsSlice';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from './app/main';
import { useEffect } from 'react';

export const ErrorTextsMessage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: rootState) => state.texts.error);
  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, []);
  return (
    <>
      {error !== null && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center p-2 bg-white dark:bg-gray-800 border-2 rounded-md border-red-700 dark:border-red-400 text-red-700 dark:text-red-400 ">
          Error has occured
          <button className="text-2xl" onClick={() => dispatch(clearError())}>
            <MdClose />
          </button>
        </div>
      )}
    </>
  );
};
