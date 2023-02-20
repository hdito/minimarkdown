import { intlFormatDistance } from 'date-fns';
import { IoMdClose } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { text } from '@/types/textTypes';
import { deleteText } from '@/app/textsSlice';

interface TextCardProps {
  text: text;
}

export const TextCard = ({ text }: TextCardProps) => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  return (
    <div className="relative flex h-[240px] w-full flex-col rounded-md border-2 border-black shadow-md hover:shadow-lg dark:border-gray-100 dark:shadow-none dark:hover:shadow-none sm:max-w-[300px]">
      {!text.isLocal ? (
        <>
          <div className="group relative flex flex-1 flex-col">
            <div className="flex-1 whitespace-pre-wrap break-words border-b-2 border-black p-1 dark:border-gray-100 sm:border-0 sm:border-b-0">
              <div className="text-sm leading-tight line-clamp-3 sm:line-clamp-[7]">
                {text.content}
              </div>
            </div>
            <div className="flex divide-x-2 divide-black rounded-t-md bg-white transition-opacity duration-150 focus-within:opacity-100 dark:divide-gray-200 dark:bg-gray-800 sm:absolute sm:left-0 sm:top-0 sm:h-full sm:w-full sm:opacity-0 sm:group-hover:opacity-100">
              <Link
                to={text.id}
                state={{ isEditMode: true }}
                className="flex flex-1 items-center justify-center gap-2 p-1 text-sm sm:flex-col sm:gap-0 sm:text-base"
              >
                <MdOutlineModeEditOutline className="text-xl sm:text-2xl" />
                {t('edit')}
              </Link>
              <Link
                to={text.id}
                state={{ isEditMode: false }}
                className="flex flex-1 items-center justify-center gap-2 p-1 text-sm sm:flex-col sm:gap-0 sm:text-base"
              >
                <IoEyeOutline className="text-xl sm:text-2xl" />
                {t('preview')}
              </Link>
            </div>
          </div>
          {(text.createdAt || text.updatedAt) && (
            <div className="border-t-2 border-black px-2 py-1 dark:border-gray-100">
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
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white dark:border-gray-200 dark:bg-gray-800"
          >
            <IoMdClose title={t('close')} />
          </button>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
