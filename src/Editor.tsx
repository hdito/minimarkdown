import { useState } from "react";
import Converter from "markdown-it";
import { Link } from "react-router-dom";
import { MdOutlineModeEditOutline, MdViewList } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import { VscPin } from "react-icons/vsc";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { IoIosSave, IoMdClose } from "react-icons/io";
import { ModeSwitcher } from "./ModeSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Menu } from "./Menu";
import { IoArrowForward, IoEyeOutline } from "react-icons/io5";
export const Editor = () => {
  const [text, setText] = useState(`text 
# h1 #
### h3 ###
###### h6 ######

- First item
- Second item
- Third item

1. First item
2. Second item
3. Third item

text text 
[link](https://www.example.com) **bold text** *italicized text*

> blockquote

text
text
text

text`);
  const [isEditMode, setIsEditMode] = useState(true);
  const converter = new Converter({
    typographer: true,
    quotes: "«»„“",
  });
  const html = converter.render(text);
  return (
    <div className="text-gray-800 dark:text-gray-50 min-h-screen flex flex-col bg-white dark:bg-gray-800">
      {isEditMode ? (
        <>
          <textarea
            autoFocus
            className="w-full flex-1 resize-none px-8 sm:px-[20%] py-6 block focus-visible:outline-none bg-inherit text-inherit"
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            name=""
            id=""
          ></textarea>
          <button
            onClick={() => setIsEditMode(false)}
            className="text-2xl fixed right-[5%] top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-all duration-150"
          >
            <IoEyeOutline title="Preview" />
          </button>
        </>
      ) : (
        <>
          <div className="view-text sm:px-[20%] px-8 py-4 flex-1 overflow-scroll">
            {parse(html)}
          </div>
          <button
            onClick={() => setIsEditMode(true)}
            className="text-2xl fixed right-[5%] top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-all duration-150"
          >
            <MdOutlineModeEditOutline title="Edit" />
          </button>
        </>
      )}
      <Menu />
    </div>
  );
};
