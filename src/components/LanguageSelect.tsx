import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

const languages: { [key: string]: string } = { en: 'English', ru: 'Русский' };

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="group relative max-h-[30px]">
      <button className="text-xl group-focus-within:outline-2 outline-black dark:outline-gray-100 rounded-md p-0.5 group-focus-within:outline">
        <IoLanguage title={t('language')} />
      </button>
      <div className="absolute w-[110px] right-0 divide-y-2 divide-black dark:divide-gray-100 z-10 hidden group-focus-within:flex border-2 border-black dark:border-gray-100 rounded-md bg-white dark:bg-gray-800 group-focus-within:flex-col overflow-hidden">
        {Object.keys(languages).map((languageCode) => (
          <button
            onClick={() => {
              if (i18n.languages[0].indexOf(languageCode) === -1)
                i18n.changeLanguage(languageCode);
            }}
            key={languageCode}
            className={`${
              i18n.languages[0].indexOf(languageCode) !== -1 ? 'font-bold' : ''
            } py-0.5 px-2`}
          >
            {languages[languageCode]}
          </button>
        ))}
      </div>
    </div>
  );
};
