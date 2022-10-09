import parse from 'html-react-parser';
import Converter from 'markdown-it';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';

export const Preview = ({
  draft,
  onShowEditor,
}: {
  draft: string;
  onShowEditor: () => void;
}) => {
  const { t } = useTranslation();
  const converter = new Converter({
    typographer: true,
    quotes: '«»„“',
  });
  const html = converter.render(draft);

  return (
    <>
      <div className="view-text sm:px-[20%] px-8 py-4 flex-1 overflow-scroll break-all">
        {parse(html)}
      </div>
      <button
        onClick={() => onShowEditor()}
        className="text-2xl fixed right-4 sm:right-[10%] top-1/2 -translate-y-1/2 translate-x-1/2 opacity-20 hover:opacity-100 transition-all duration-150"
      >
        <MdOutlineModeEditOutline title={t('edit')} />
      </button>
    </>
  );
};
