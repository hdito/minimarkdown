import { useTranslation } from 'react-i18next';
import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { addText, selectTextsArray } from './app/textsSlice';
import { selectUid } from './app/userSlice';
import { TextCard } from './TextCard';
import { sortTexts } from './utils/sortTexts';

export const Texts = () => {
  const texts = useSelector(selectTextsArray());
  const dispatch = useDispatch();
  const uid = useSelector(selectUid());
  const { t } = useTranslation();
  return (
    <>
      <button
        onClick={() => dispatch(addText(uid as string))}
        className="relative flex gap-2 sm:gap-1 sm:flex-col justify-center items-center p-2 sm:h-[240px] h-fit border-2 border-black dark:border-gray-100 rounded-md shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-none"
      >
        <HiOutlinePlus className="text-xl sm:text-4xl" />
        {t('createNewText')}
      </button>
      {texts
        .slice()
        .sort(sortTexts)
        .reverse()
        .map((text) => (
          <TextCard key={text.id} text={text} />
        ))}
    </>
  );
};
