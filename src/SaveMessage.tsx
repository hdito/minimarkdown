import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { rootState } from './app/main';
import { clearSaveData } from './app/textsSlice';

export const SaveMessage = () => {
  const params = useParams();
  const id = params.id as string;

  const saveData = useSelector(
    (state: rootState) => state.texts.texts.find((text) => text.id === id)?.save
  ) as true | unknown | null;
  const dispatch = useDispatch();

  return (
    <>
      {saveData && (
        <div
          className={`fixed top-4 right-4 p-2 rounded-md flex gap-2 border-2 bg-white ${
            saveData === true
              ? 'border-green-700 text-green-700'
              : 'border-red-700 text-red-700'
          }`}
        >
          {saveData ? 'Saved successfully' : 'Error on save'}{' '}
          <button onClick={() => dispatch(clearSaveData(id))}>
            <MdClose />
          </button>
        </div>
      )}
    </>
  );
};
