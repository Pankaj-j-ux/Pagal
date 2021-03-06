import { useState, useEffect } from 'react';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close };
}

// usage
// const is992px = useMediaQuery('(max-width: 992px)')

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

// export const checker = () => {
// console.log(window.matchMedia('(max-width: 900px)'));
// return 0;
// };
