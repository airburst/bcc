import { useRef, useEffect } from "react";

export const useClickOutside = (callback: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      console.log(
        "🚀 ~ file: useClickOutside.ts ~ line 8 ~ handleClick ~ event",
        event
      );
      callback();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback]);

  return ref;
};
