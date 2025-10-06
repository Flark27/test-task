import { useEffect, useState } from "react";

export const useIsMobile = (query: string = "(max-width: 767px)"): boolean => {
  const getMatches = (newQuery: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(newQuery).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
