import parse from 'html-react-parser';
import Converter from 'markdown-it';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';

interface PreviewProps {
  draft: string;
  onShowEditor: () => void;
}

export const Preview = ({ draft, onShowEditor }: PreviewProps) => {
  const converter = new Converter({
    typographer: true,
    quotes: '«»„“',
  });
  const html = converter.render(draft);

  const { t } = useTranslation();

  return (
    <>
      <div className="view-text flex-1 overflow-scroll break-words px-8 py-4 sm:px-[20%]">
        {parse(html)}
      </div>
      <button
        onClick={() => onShowEditor()}
        className="fixed right-4 top-1/2 -translate-y-1/2 translate-x-1/2 text-2xl opacity-20 transition-all duration-150 hover:opacity-100 sm:right-[10%]"
      >
        <MdOutlineModeEditOutline title={t('edit')} />
      </button>
    </>
  );
};
