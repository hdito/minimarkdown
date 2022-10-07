import { useEffect, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { TbPin, TbPinned } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveText } from './app/textsSlice';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Menu = ({ draft }: { draft: string }) => {
  const params = useParams();
  const id = params.id as string;
  const [isPinned, setIsPinned] = useState(
    'isPinned' in localStorage
      ? (JSON.parse(localStorage.getItem('isPinned') as string) as boolean)
      : true
  );
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('isPinned', JSON.stringify(isPinned));
  }, [isPinned]);
  return (
    <div
      className={`${
        isPinned
          ? ''
          : 'opacity-0 hover:opacity-100 transition-all duration-200'
      } sticky bottom-0 flex justify-center items-center gap-8 text-2xl p-2 border-t-2 border-black dark:border-gray-200 bg-white dark:bg-gray-800`}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => dispatch(saveText({ id, content: draft }))}>
          <BiSave />
        </button>
      </div>
      <button onClick={() => setIsPinned((prev) => !prev)}>
        {isPinned ? <TbPinned /> : <TbPin />}
      </button>
      <ThemeSwitcher />
      <Link to="/texts">
        <IoMdClose />
      </Link>
    </div>
  );
};
