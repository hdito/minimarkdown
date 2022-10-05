import { useState } from "react";
import { intlFormatDistance, sub } from "date-fns";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { HiOutlinePlus, HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { TextCard } from "./TextCard";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "./app/main";
import { addText } from "./app/textsSlice";
import { sortTexts } from "./utils/sortTexts";
export const Texts = () => {
  const { texts } = useSelector((state: rootState) => state.texts);
  const isLoading = useSelector((state: rootState) => state.texts.isLoading);
  const dispatch = useDispatch();
  const uid = useSelector((state: rootState) => state.user.uid);
  return (
    <div className="min-h-screen px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-gray-100">
      <header className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4 cursor-default">
          {!isLoading ? "Texts" : "Texts are being loaded"}
        </h1>
        <ThemeSwitcher />
      </header>
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => dispatch(addText({ uid: uid as string }))}
          className="relative border-2 border-black dark:border-gray-100 max-w-[200px] w-full aspect-[3/4] rounded-md shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-none flex flex-col justify-center items-center p-2"
        >
          <HiOutlinePlus className="text-4xl" />
          Create new text
        </button>
        {texts
          .slice()
          .sort(sortTexts)
          .reverse()
          .map((text) => (
            <TextCard key={text.id} text={text} />
          ))}
      </div>
    </div>
  );
};
