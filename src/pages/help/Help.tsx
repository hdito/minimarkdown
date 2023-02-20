import { LanguageSelect } from '@/components/LanguageSelect';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Help = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen max-w-[100vw] bg-white text-black dark:bg-gray-800 dark:text-gray-100">
      <header className="mb-4 flex items-center gap-1 px-4 py-2 sm:gap-4">
        <div className="mr-auto flex items-baseline gap-2">
          <h1 className="text-2xl font-bold sm:text-4xl">{t('help')}</h1>
          <Link to="/" className="hover:underline">
            {t('texts')}
          </Link>
        </div>
        <LanguageSelect />
        <ThemeSwitcher />
      </header>
      <main>
        <section className="px-4">
          <p className="mb-4 max-w-prose">{t('description.first')}</p>
          <p className="mb-4 max-w-prose">{t('description.second')}</p>
        </section>
        <section className="grid grid-cols-[1fr_1fr] pb-4 text-sm sm:grid-cols-[minmax(auto,_40ch)_1fr]">
          <h3 className="pl-4 text-2xl font-bold">Markdown</h3>
          <h3 className="pl-4 text-2xl font-bold">HTML</h3>
          <h3 className="col-span-2 px-4 py-1 text-xl font-bold">
            {t('titles')}
          </h3>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700"># h1 #</p>
          <h1 className="bg-gray-100 px-4 py-1 text-5xl font-bold dark:bg-gray-700">
            h1
          </h1>
          <p className="px-4 py-1">## h2 ##</p>
          <h2 className="px-4 py-1 text-4xl font-bold">h2</h2>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700">### h3 ###</p>
          <h2 className="bg-gray-100 px-4 py-1 text-3xl font-bold dark:bg-gray-700">
            h3
          </h2>
          <p className="px-4 py-1">#### h4 ####</p>
          <h2 className="px-4 py-1 text-2xl font-bold">h4</h2>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700">
            ##### h5 #####
          </p>
          <h2 className="bg-gray-100 px-4 py-1 text-xl font-bold dark:bg-gray-700">
            h5
          </h2>
          <p className="px-4 py-1">###### h6 ######</p>
          <h2 className="px-4 py-1 text-lg font-bold">h6</h2>
          <h3 className="col-span-2 mt-6 px-4 py-1 text-xl font-bold">
            {t('textFormatting')}
          </h3>
          <p className="break-words bg-gray-100 px-4 py-1 dark:bg-gray-700">
            _{t('italic')}_ {t('or')} *{t('italic')}*
          </p>
          <em className="break-words bg-gray-100 px-4 py-1 dark:bg-gray-700">
            {t('italic')}
          </em>
          <p className="break-words px-4 py-1">
            **{t('bold')}** {t('or')} __{t('bold')}__
          </p>
          <strong className="break-words py-1 pl-4">{t('bold')}</strong>
          <h3 className="col-span-2 mt-6 px-4 py-1 text-xl font-bold">Lists</h3>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700">
            * {t('item')} 1 <br />* {t('item')} 2 <br />
            {t('or')} <br />- {t('item')} 1 <br />- {t('item')} 2
          </p>
          <ul className="list-inside list-disc break-words bg-gray-100 px-4 py-1 dark:bg-gray-700">
            <li>{t('item')} 1</li>
            <li>{t('item')} 2</li>
          </ul>
          <p className="px-4 py-1">
            1. {t('item')} 1 <br />
            2. {t('item')} 2 <br />
          </p>
          <ol className="list-inside list-decimal break-words px-4 py-1">
            <li>{t('item')} 1</li>
            <li>{t('item')} 2</li>
          </ol>
          <h3 className="col-span-2 mt-6 px-4 py-1 text-xl font-bold">
            {t('quotes')}
          </h3>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700 ">
            {'>'} {t('quote')}
          </p>
          <div className="bg-gray-100 px-4 py-1 dark:bg-gray-700 ">
            <blockquote className="my-2 border-l-8 border-orange-700 px-4 dark:border-orange-500">
              {t('quote')}
            </blockquote>
          </div>
          <h3 className="col-span-2 mt-6 px-4 py-1 text-xl font-bold">
            {t('code')}
          </h3>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700 ">`code`</p>
          <p className="bg-gray-100 px-4 py-2 dark:bg-gray-700 ">
            <code className=" rounded border-2 border-black bg-teal-100 p-1 text-gray-700 dark:border-gray-100 dark:bg-teal-700 dark:text-gray-100">
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
            <pre className="rounded-md border-2 border-black bg-sky-100 p-1 text-gray-700 dark:border-gray-100 dark:bg-sky-700 dark:text-gray-100">
              <code>
                code <br />
                block
              </code>
            </pre>
          </div>
          <h3 className="col-span-2 mt-6 px-4 py-1 text-xl font-bold">
            {t('linksAndImages')}
          </h3>

          <p className="break-all bg-gray-100 px-4 py-1 dark:bg-gray-700">
            [{t('myGithub')}](https://github.com/hdito)
          </p>
          <p className="bg-gray-100 px-4 py-1 dark:bg-gray-700">
            <a
              className="text-blue-500 underline dark:text-blue-300"
              href="https://github.com/hdito"
            >
              {t('myGithub')}
            </a>
          </p>
          <p className="break-all px-4 py-1">
            ![{t('juicyTomatoes')}]
            (https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/220px-Tomato_je.jpg)
          </p>
          <p className="break-words px-4 py-2">
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
