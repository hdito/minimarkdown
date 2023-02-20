import { useTranslation } from 'react-i18next';
import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { addText, selectTextsArray } from '@/app/textsSlice';
import { selectUid } from '@/app/userSlice';
import { TextCard } from './TextCard';
import { sortTexts } from '@/utils/sortTexts';

export const Texts = () => {
  const texts = useSelector(selectTextsArray());
  const uid = useSelector(selectUid());
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => dispatch(addText(uid as string))}
        className="group relative flex h-fit items-center justify-center gap-2 self-start rounded-md border-2 border-black p-2 shadow-md hover:shadow-lg dark:border-gray-100 dark:shadow-none dark:hover:shadow-none sm:h-[240px] sm:flex-col sm:gap-1"
      >
        <HiOutlinePlus className="text-xl transition-transform group-hover:scale-125 sm:text-4xl" />
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
