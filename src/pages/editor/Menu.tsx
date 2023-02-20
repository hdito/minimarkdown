import { saveText } from '@/app/textsSlice';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useMenu } from '@/hooks/useMenu';
import { useTranslation } from 'react-i18next';
import { BiSave } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { TbPin, TbPinned } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

interface MenuProps {
  draft: string;
}

export const Menu = ({ draft }: MenuProps) => {
  const params = useParams();
  const id = params.id as string;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [isPinned, setIsPinned] = useMenu();

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
          <BiSave title={t('save')} />
        </button>
      </div>
      <button onClick={() => setIsPinned((prev) => !prev)}>
        {isPinned ? (
          <TbPinned title={t('unpin')} />
        ) : (
          <TbPin title={t('pin')} />
        )}
      </button>
      <ThemeSwitcher />
      <Link to="/texts">
        <IoMdClose title={t('close')} />
      </Link>
    </div>
  );
};
