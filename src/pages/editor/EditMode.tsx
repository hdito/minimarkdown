import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { IoEyeOutline } from 'react-icons/io5';

interface EditModeProps {
  draft: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onShowPreview: () => void;
}

export const EditMode = ({ draft, onChange, onShowPreview }: EditModeProps) => {
  const { t } = useTranslation();
  return (
    <>
      <textarea
        autoFocus
        className="w-full flex-1 resize-none px-8 sm:px-[20%] py-6 block focus-visible:outline-none bg-inherit text-inherit"
        spellCheck={false}
        value={draft}
        onChange={onChange}
        name=""
        id=""
      ></textarea>
      <button
        onClick={() => onShowPreview()}
        className="text-2xl fixed right-4 sm:right-[10%] top-1/2 -translate-y-1/2 translate-x-1/2 opacity-20 hover:opacity-100 transition-all duration-150"
      >
        <IoEyeOutline title={t('preview')} />
      </button>
    </>
  );
};
