import { useState } from "react";
import { intlFormatDistance, sub } from "date-fns";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
export const Texts = () => {
  const [texts, setTexts] = useState([
    {
      id: "fdsaf",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      createdAt: sub(Date.now(), { days: 5 }),
      updatedAt: sub(Date.now(), { hours: 10 }),
    },
    {
      id: "fdsfsdasdf",
      content: "Expedita natus accusamus fugiat perspiciatis dolorem officia!",
      createdAt: sub(Date.now(), { days: 1 }),
      updatedAt: sub(Date.now(), { hours: 2 }),
    },
  ]);
  return (
    <div className="px-4 py-2">
      <h1 className="text-4xl font-bold mb-4 cursor-default">Texts</h1>
      <div className="flex gap-4 flex-wrap">
        {texts.map((text) => (
          <div
            className="group border-2 border-black max-w-[200px] rounded-md overflow-hidden shadow-md hover:shadow-lg flex flex-col"
            key={text.id}
          >
            <p className="aspect-[4/3] relative leading-tight text-sm p-1 flex-1 overflow-hidden overflow-ellipsis">
              {text.content}
              <div className="group-hover:opacity-100 opacity-0 absolute w-full h-full flex left-0 top-0 transition-all duration-150 bg-white divide-x-2 divide-black">
                <Link
                  to={text.id}
                  className="flex-1 flex flex-col justify-center items-center"
                >
                  <MdOutlineModeEditOutline className="text-2xl" title="Edit" />
                  Edit
                </Link>
                <Link
                  to={text.id}
                  className="flex-1 flex flex-col justify-center items-center"
                >
                  <IoEyeOutline className="text-2xl" title="Preview" />
                  Preview
                </Link>
              </div>
            </p>
            <div className="border-t-2 border-black px-2 py-1">
              <p>
                Created{" "}
                <span className="italic">
                  {intlFormatDistance(text.createdAt, Date.now())}
                </span>
              </p>
              <p>
                Updated{" "}
                <span className="italic">
                  {intlFormatDistance(text.updatedAt, Date.now())}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
