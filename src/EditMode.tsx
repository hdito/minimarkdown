import { ChangeEventHandler } from 'react';
import { IoEyeOutline } from 'react-icons/io5';

export const EditMode = ({
  draft,
  onChange,
  onShowPreview,
}: {
  draft: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onShowPreview: () => void;
}) => {
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
        className="text-2xl fixed right-[5%] top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-all duration-150"
      >
        <IoEyeOutline title="Preview" />
      </button>
    </>
  );
};
