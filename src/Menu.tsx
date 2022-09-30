import { useEffect, useState } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";
import { TbDownload } from "react-icons/tb";
import { VscPin, VscPinned } from "react-icons/vsc";

export const Menu = () => {
  const [isPinned, setIsPinned] = useState(
    "isPinned" in localStorage
      ? (JSON.parse(localStorage.getItem("isPinned") as string) as boolean)
      : true
  );
  useEffect(() => {
    localStorage.setItem("isPinned", JSON.stringify(isPinned));
  }, [isPinned]);
  return (
    <div
      className={`${
        isPinned
          ? ""
          : "opacity-0 hover:opacity-100 transition-all duration-200"
      } sticky bottom-0 flex justify-center items-center gap-6 text-2xl p-2 border-t-2 border-gray-300 bg-white`}
    >
      <div className="flex items-center gap-2">
        <button>
          <IoIosSave />
        </button>
        <button>
          <TbDownload />
        </button>
      </div>
      <button onClick={() => setIsPinned((prev) => !prev)}>
        {isPinned ? <VscPinned /> : <VscPin />}
      </button>
      <button>
        <IoMdClose />
      </button>
    </div>
  );
};
