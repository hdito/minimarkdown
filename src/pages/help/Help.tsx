import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageSelect } from '../../components/LanguageSelect';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

export const Help = () => {
  const { t, i18n } = useTranslation();
  useEffect(() =>
    console.log(i18n.options, i18n.resolvedLanguage, i18n.languages)
  );
  return (
    <div className="min-h-screen max-w-[100vw] bg-white dark:bg-gray-800 text-black dark:text-gray-100">
      <header className="flex px-4 py-2 items-center gap-1 sm:gap-4 mb-4">
        <div className="flex items-baseline gap-2 mr-auto">
          <h1 className="text-2xl sm:text-4xl font-bold">{t('help')}</h1>
          <Link to="/" className="hover:underline">
            {t('texts')}
          </Link>
        </div>
        <LanguageSelect />
        <ThemeSwitcher />
      </header>
      <main>
        <section className="px-4">
          <p className="max-w-prose mb-4">{t('description.first')}</p>
          <p className="max-w-prose mb-4">{t('description.second')}</p>
        </section>
        <section className="text-sm pb-4 grid grid-cols-[1fr_1fr] sm:grid-cols-[minmax(auto,_40ch)_1fr]">
          <h3 className="pl-4 text-2xl font-bold">Markdown</h3>
          <h3 className="pl-4 text-2xl font-bold">HTML</h3>
          <h3 className="px-4 py-1 text-xl font-bold col-span-2">
            {t('titles')}
          </h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700"># h1 #</p>
          <h1 className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-5xl font-bold">
            h1
          </h1>
          <p className="px-4 py-1">## h2 ##</p>
          <h2 className="px-4 py-1 text-4xl font-bold">h2</h2>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">### h3 ###</p>
          <h2 className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-3xl font-bold">
            h3
          </h2>
          <p className="px-4 py-1">#### h4 ####</p>
          <h2 className="px-4 py-1 text-2xl font-bold">h4</h2>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            ##### h5 #####
          </p>
          <h2 className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-xl font-bold">
            h5
          </h2>
          <p className="px-4 py-1">###### h6 ######</p>
          <h2 className="px-4 py-1 text-lg font-bold">h6</h2>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            {t('textFormatting')}
          </h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700 break-words">
            _{t('italic')}_ {t('or')} *{t('italic')}*
          </p>
          <em className="px-4 py-1 bg-gray-100 dark:bg-gray-700 break-words">
            {t('italic')}
          </em>
          <p className="px-4 py-1 break-words">
            **{t('bold')}** {t('or')} __{t('bold')}__
          </p>
          <strong className="pl-4 py-1 break-words">{t('bold')}</strong>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">Lists</h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            * {t('item')} 1 <br />* {t('item')} 2 <br />
            {t('or')} <br />- {t('item')} 1 <br />- {t('item')} 2
          </p>
          <ul className="px-4 py-1 bg-gray-100 dark:bg-gray-700 list-disc list-inside break-words">
            <li>{t('item')} 1</li>
            <li>{t('item')} 2</li>
          </ul>
          <p className="px-4 py-1">
            1. {t('item')} 1 <br />
            2. {t('item')} 2 <br />
          </p>
          <ol className="px-4 py-1 list-decimal list-inside break-words">
            <li>{t('item')} 1</li>
            <li>{t('item')} 2</li>
          </ol>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            {t('quotes')}
          </h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700 ">
            {'>'} {t('quote')}
          </p>
          <div className="px-4 py-1 bg-gray-100 dark:bg-gray-700 ">
            <blockquote className="border-l-8 border-orange-700 px-4 my-2 dark:border-orange-500">
              {t('quote')}
            </blockquote>
          </div>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            {t('code')}
          </h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700 ">`code`</p>
          <p className="px-4 py-2 bg-gray-100 dark:bg-gray-700 ">
            <code className=" text-gray-700 dark:text-gray-100 bg-teal-100 dark:bg-teal-700 rounded p-1 border-black dark:border-gray-100 border-2">
              code
            </code>
          </p>

          <p className="px-4 py-1">
            ``` <br />
            code <br />
            block <br />
            ```
          </p>
          <div className="px-4 py-2">
            <pre className="p-1 text-gray-700 dark:text-gray-100 bg-sky-100 dark:bg-sky-700 border-2 border-black dark:border-gray-100 rounded-md">
              <code>
                code <br />
                block
              </code>
            </pre>
          </div>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            {t('linksAndImages')}
          </h3>

          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700 break-all">
            [{t('myGithub')}](https://github.com/hdito)
          </p>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            <a
              className="underline text-blue-500 dark:text-blue-300"
              href="https://github.com/hdito"
            >
              {t('myGithub')}
            </a>
          </p>
          <p className="px-4 py-1 break-all">
            ![{t('juicyTomatoes')}]
            (https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/220px-Tomato_je.jpg)
          </p>
          <p className="px-4 py-2 break-words">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/220px-Tomato_je.jpg"
              alt="Juicy tomatoes"
            />
          </p>
        </section>
      </main>
    </div>
  );
};
