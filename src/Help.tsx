import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Help = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-gray-100">
      <header className="flex px-4 py-2 items-baseline gap-4">
        <h1 className="text-4xl font-bold mb-4">Help</h1>
        <Link to="/" className="hover:underline mr-auto">
          Texts
        </Link>
        <ThemeSwitcher />
      </header>
      <main>
        <section className="px-4">
          <p className="max-w-prose mb-4">
            Minimarkdown was created so you can write markdown texts with as
            little distraction as possible. For those ununitiated markdown is a
            tool to write HTML in plain text with special characters like * or
            #.
          </p>
        </section>
        <section className="pb-4 grid grid-cols-[auto_auto] sm:grid-cols-[minmax(auto,_40ch)_1fr]">
          <h3 className="px-4 text-2xl font-bold">Markdown</h3>
          <h3 className="px-4 text-2xl font-bold">HTML</h3>
          <h3 className="px-4 py-1 text-xl font-bold col-span-2">Titles</h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700"># h1 #</p>
          <h1 className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-6xl font-bold">
            h1
          </h1>
          <p className="px-4 py-1">## h2 ##</p>
          <h2 className="px-4 py-1 text-5xl font-bold">h2</h2>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">### h3 ###</p>
          <h2 className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-4xl font-bold">
            h3
          </h2>
          <p className="px-4 py-1">#### h4 ####</p>
          <h2 className="px-4 py-1 text-3xl font-bold">h4</h2>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            ##### h5 #####
          </p>
          <h2 className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-2xl font-bold">
            h5
          </h2>
          <p className="px-4 py-1">###### h6 ######</p>
          <h2 className="px-4 py-1 text-xl font-bold">h6</h2>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            Text formatting
          </h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            _italic_ <br />
            *italic*
          </p>
          <em className="px-4 py-1 bg-gray-100 dark:bg-gray-700">italic</em>
          <p className="px-4 py-1">
            **bold** <br />
            __bold__
          </p>
          <strong className="px-4 py-1">bold</strong>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">Lists</h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            * list 1 <br />* item 2
          </p>
          <ul className="px-4 py-1 bg-gray-100 dark:bg-gray-700 list-disc list-inside">
            <li>item 1</li>
            <li>item 2</li>
          </ul>
          <p className="px-4 py-1">
            1. item 1 <br />
            2. item 2
          </p>
          <ol className="px-4 py-1 list-decimal list-inside">
            <li>item 1</li>
            <li>item 2</li>
          </ol>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            Quotes
          </h3>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700 ">{'>'} quote</p>
          <div className="px-4 py-1 bg-gray-100 dark:bg-gray-700 ">
            <blockquote className="border-l-8 border-orange-700 px-4 my-2 dark:border-orange-500">
              quote
            </blockquote>
          </div>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">Code</h3>
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
          <div className="px-4 py-1">
            <pre className="p-1 text-gray-700 dark:text-gray-100 bg-sky-100 dark:bg-sky-700 border-2 border-black dark:border-gray-100 rounded-md">
              <code>
                code <br />
                block
              </code>
            </pre>
          </div>
          <h3 className="px-4 py-1 mt-6 text-xl font-bold col-span-2">
            Links and images
          </h3>

          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700 break-all">
            [My github](https://github.com/hdito)
          </p>
          <p className="px-4 py-1 bg-gray-100 dark:bg-gray-700">
            <a
              className="underline text-blue-500 dark:text-blue-300"
              href="https://github.com/hdito"
            >
              My github
            </a>
          </p>
          <p className="px-4 py-1 break-all">
            ![Juicy
            tomatoes](https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/220px-Tomato_je.jpg)
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/220px-Tomato_je.jpg"
            alt="Juicy tomatoes"
          />
        </section>
      </main>
    </div>
  );
};
