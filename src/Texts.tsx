import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from './app/main';
import { addText, selectTextsArray } from './app/textsSlice';
import { selectUid } from './app/userSlice';
import { TextCard } from './TextCard';
import { ThemeSwitcher } from './ThemeSwitcher';
import { sortTexts } from './utils/sortTexts';
import { ErrorTextsMessage } from './ErrorTextsMessage';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect';

export const Texts = () => {
  const texts = useSelector(selectTextsArray());
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);
  const dispatch = useDispatch();
  const uid = useSelector(selectUid());
  const { t, ready } = useTranslation('translation', { useSuspense: false });
  return (
    <div className="min-h-screen px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-gray-100 transition-all duration-150">
      {ready && (
        <>
          <header className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl sm:text-4xl font-bold mr-auto cursor-default">
              {!isLoading ? t('texts') : t('textsLoading')}
            </h1>
            <LanguageSelect />
            <Link to="/help" className="text-2xl">
              <IoHelpCircleOutline title={t('help')} />
            </Link>
            <ThemeSwitcher />
          </header>
          <div className="flex gap-4 flex-wrap pb-2">
            <button
              onClick={() => dispatch(addText(uid as string))}
              className="relative flex gap-2 sm:gap-1 sm:flex-col justify-center items-center p-2 sm:h-[240px] border-2 border-black dark:border-gray-100 rounded-md shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-none"
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
          </div>
          <ErrorTextsMessage />
        </>
      )}
    </div>
  );
};
