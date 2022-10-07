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

export const Texts = () => {
  const texts = useSelector(selectTextsArray());
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);
  const dispatch = useDispatch();
  const uid = useSelector(selectUid());
  return (
    <div className="min-h-screen px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-gray-100">
      <header className="flex items-center gap-4">
        <h1 className="text-4xl font-bold mb-4 mr-auto cursor-default">
          {!isLoading ? 'Texts' : 'Texts are being loaded'}
        </h1>
        <Link to="/help" className="text-2xl">
          <IoHelpCircleOutline />
        </Link>
        <ThemeSwitcher />
      </header>
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => dispatch(addText(uid as string))}
          className="relative flex flex-col justify-center items-center p-2 h-[250px] border-2 border-black dark:border-gray-100 rounded-md shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-none"
        >
          <HiOutlinePlus className="text-4xl" />
          Create new text
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
    </div>
  );
};
