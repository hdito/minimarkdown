import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type useMenuOutput = [boolean, Dispatch<SetStateAction<boolean>>];

export const useMenu = (): useMenuOutput => {
  const [isPinned, setIsPinned] = useState(
    'isPinned' in localStorage
      ? Boolean(JSON.parse(localStorage.getItem('isPinned') as string))
      : true
  );

  useEffect(() => {
    localStorage.setItem('isPinned', JSON.stringify(isPinned));
  }, [isPinned]);

  return [isPinned, setIsPinned];
};
