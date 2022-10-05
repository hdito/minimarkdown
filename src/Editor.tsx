import parse from "html-react-parser";
import Converter from "markdown-it";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { rootState } from "./app/main";
import { Menu } from "./Menu";

export const Editor = () => {
  const { id } = useParams();
  const text = useSelector((state: rootState) =>
    state.texts.texts.find((text) => text.id === id)
  );
  const [draft, setDraft] = useState(text?.content ?? "");
  const { state } = useLocation();
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode ?? true);
  useEffect(() => console.log(state));
  const converter = new Converter({
    typographer: true,
    quotes: "«»„“",
  });
  const html = converter.render(draft);
  return (
    <div className="text-gray-800 dark:text-gray-50 min-h-screen flex flex-col bg-white dark:bg-gray-800">
      {isEditMode ? (
        <>
          <textarea
            autoFocus
            className="w-full flex-1 resize-none px-8 sm:px-[20%] py-6 block focus-visible:outline-none bg-inherit text-inherit"
            spellCheck={false}
            value={draft}
            onChange={(e) => setDraft(e.currentTarget.value)}
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
      <Menu draft={draft} />
    </div>
  );
};
