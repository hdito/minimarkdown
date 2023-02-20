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
        className="block w-full flex-1 resize-none bg-inherit px-8 py-6 text-inherit focus-visible:outline-none sm:px-[20%]"
        spellCheck={false}
        value={draft}
        onChange={onChange}
        name=""
        id=""
      ></textarea>
      <button
        onClick={() => onShowPreview()}
        className="fixed right-4 top-1/2 -translate-y-1/2 translate-x-1/2 text-2xl opacity-20 transition-all duration-150 hover:opacity-100 sm:right-[10%]"
      >
        <IoEyeOutline title={t('preview')} />
      </button>
    </>
  );
};
