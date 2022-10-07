import { intlFormatDistance } from 'date-fns';
import { IoMdClose } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { text } from './types/textTypes';
import { deleteText } from './app/textsSlice';

export const TextCard = ({ text }: { text: text }) => {
  const dispatch = useDispatch();
  return (
    <div className="relative border-2 aspect-[5/3] sm:aspect-square border-black dark:border-gray-100 sm:max-w-[250px] w-full rounded-md shadow-md dark:shadow-none dark:hover:shadow-none hover:shadow-lg flex flex-col transition-all duration-150">
      {!text.isLocal ? (
        <>
          <div className="flex-1 flex flex-col group relative">
            <div className="flex-1 p-1 border-b-2 sm:border-b-0 border-black dark:border-gray-100 sm:border-0 whitespace-pre-wrap break-all">
              <div className="leading-tight line-clamp-3 sm:line-clamp-[7] text-sm">
                {text.content}
              </div>
            </div>
            <div className="sm:group-hover:opacity-100 sm:opacity-0 rounded-t-md sm:absolute sm:w-full sm:h-full flex sm:left-0 sm:top-0 transition-all duration-150 bg-white dark:bg-gray-800 divide-x-2 divide-black dark:divide-gray-200">
              <Link
                to={text.id}
                state={{ isEditMode: true }}
                className="p-1 flex-1 flex gap-2 sm:gap-0 sm:flex-col justify-center items-center"
              >
                <MdOutlineModeEditOutline className="text-2xl" title="Edit" />
                Edit
              </Link>
              <Link
                to={text.id}
                state={{ isEditMode: false }}
                className="p-1 flex-1 flex gap-2 sm:gap-0 sm:flex-col justify-center items-center"
              >
                <IoEyeOutline className="text-2xl" title="Preview" />
                Preview
              </Link>
            </div>
          </div>
          {(text.createdAt || text.updatedAt) && (
            <div className="border-t-2 border-black dark:border-gray-200 px-2 py-1">
              {text?.updatedAt && (
                <p>
                  Updated{' '}
                  <em>
                    {intlFormatDistance(new Date(text.updatedAt), Date.now())}
                  </em>
                </p>
              )}
              {text.createdAt && (
                <p>
                  Created{' '}
                  <em>
                    {intlFormatDistance(new Date(text.createdAt), Date.now())}
                  </em>
                </p>
              )}
            </div>
          )}
          <button
            onClick={() => dispatch(deleteText(text.id))}
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white dark:bg-gray-800 border-black dark:border-gray-200"
          >
            <IoMdClose />
          </button>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
