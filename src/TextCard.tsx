import { intlFormatDistance } from 'date-fns';
import { IoMdClose } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { text } from './types/textTypes';
import { deleteText } from './app/textsSlice';
import { useTranslation } from 'react-i18next';

export const TextCard = ({ text }: { text: text }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  return (
    <div className="relative border-2 h-[240px] sm:max-w-[300px] w-full border-black dark:border-gray-100 rounded-md shadow-md dark:shadow-none dark:hover:shadow-none hover:shadow-lg flex flex-col transition-all duration-150">
      {!text.isLocal ? (
        <>
          <div className="flex-1 flex flex-col group relative">
            <div className="flex-1 p-1 border-b-2 sm:border-b-0 border-black dark:border-gray-100 sm:border-0 whitespace-pre-wrap break-words">
              <div className="leading-tight line-clamp-3 sm:line-clamp-[7] text-sm">
                {text.content}
              </div>
            </div>
            <div className="sm:group-hover:opacity-100 sm:opacity-0 rounded-t-md sm:absolute sm:w-full sm:h-full flex sm:left-0 sm:top-0 transition-all duration-150 bg-white dark:bg-gray-800 divide-x-2 divide-black dark:divide-gray-200">
              <Link
                to={text.id}
                state={{ isEditMode: true }}
                className="text-sm sm:text-base p-1 flex-1 flex gap-2 sm:gap-0 sm:flex-col justify-center items-center"
              >
                <MdOutlineModeEditOutline className="text-xl sm:text-2xl" />
                {t('edit')}
              </Link>
              <Link
                to={text.id}
                state={{ isEditMode: false }}
                className="text-sm sm:text-base p-1 flex-1 flex gap-2 sm:gap-0 sm:flex-col justify-center items-center"
              >
                <IoEyeOutline className="text-xl sm:text-2xl" />
                {t('preview')}
              </Link>
            </div>
          </div>
          {(text.createdAt || text.updatedAt) && (
            <div className="border-t-2 border-black dark:border-gray-100 px-2 py-1">
              {text?.updatedAt && (
                <p>
                  {t('updated')}{' '}
                  <em>
                    {intlFormatDistance(new Date(text.updatedAt), Date.now(), {
                      locale: i18n.language,
                    })}
                  </em>
                </p>
              )}
              {text.createdAt && (
                <p>
                  {t('created')}{' '}
                  <em>
                    {intlFormatDistance(new Date(text.createdAt), Date.now(), {
                      locale: i18n.language,
                    })}
                  </em>
                </p>
              )}
            </div>
          )}
          <button
            onClick={() => dispatch(deleteText(text.id))}
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white dark:bg-gray-800 border-black dark:border-gray-200 transition-all duration-150"
          >
            <IoMdClose title={t('close')} />
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
