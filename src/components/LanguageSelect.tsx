import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

const languages: { [key: string]: string } = { en: 'English', ru: 'Русский' };

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="group relative max-h-[30px]">
      <button className="rounded-md p-0.5 text-xl outline-black group-focus-within:outline group-focus-within:outline-2 dark:outline-gray-100">
        <IoLanguage title={t('language')} />
      </button>
      <div className="absolute right-0 z-10 hidden w-[110px] divide-y-2 divide-black overflow-hidden rounded-md border-2 border-black bg-white group-focus-within:flex group-focus-within:flex-col dark:divide-gray-100 dark:border-gray-100 dark:bg-gray-800">
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
