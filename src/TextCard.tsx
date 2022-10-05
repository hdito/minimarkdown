import { intlFormatDistance } from "date-fns";
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { text } from "./types/textTypes";
import { deleteText } from "./app/textsSlice";

export const TextCard = ({ text }: { text: text }) => {
  const dispatch = useDispatch();
  return (
    <div className="relative border-2 aspect-square border-black dark:border-gray-100 max-w-[250px] w-full rounded-md shadow-md dark:shadow-none dark:hover:shadow-none hover:shadow-lg flex flex-col">
      {!text.isLocal ? (
        <>
          <div className="flex-1 group relative p-1">
            <div className="leading-tight whitespace-pre-wrap break-all line-clamp-[7] text-sm ">
              {text.content}
            </div>
            <div className="group-hover:opacity-100 opacity-0 rounded-t-md absolute w-full h-full flex left-0 top-0 transition-all duration-150 bg-white dark:bg-gray-800 divide-x-2 divide-black dark:divide-gray-200">
              <Link
                to={text.id}
                state={{ isEditMode: true }}
                className="flex-1 flex flex-col justify-center items-center"
              >
                <MdOutlineModeEditOutline className="text-2xl" title="Edit" />
                Edit
              </Link>
              <Link
                to={text.id}
                state={{ isEditMode: false }}
                className="flex-1 flex flex-col justify-center items-center"
              >
                <IoEyeOutline className="text-2xl" title="Preview" />
                Preview
              </Link>
            </div>
          </div>
          {(text.createdAt || text.updatedAt) && (
            <div className="border-t-2 border-black dark:border-gray-200 px-2 py-1">
              {text?.updatedAt && (
                <p>
                  Updated{" "}
                  <span className="italic">
                    {intlFormatDistance(new Date(text.updatedAt), Date.now())}
                  </span>
                </p>
              )}
              {text.createdAt && (
                <p>
                  Created{" "}
                  <span className="italic">
                    {intlFormatDistance(new Date(text.createdAt), Date.now())}
                  </span>
                </p>
              )}
            </div>
          )}
          <button
            onClick={() => dispatch(deleteText(text.id))}
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white dark:bg-gray-800 border-black dark:border-gray-200"
          >
            <IoMdClose />
          </button>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
