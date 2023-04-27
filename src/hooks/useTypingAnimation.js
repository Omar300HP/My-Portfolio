import { useEffect, useState } from "react";

const useTypingAnimation = (textToType, interval = 100) => {
  const [text, setText] = useState({ text: "", cartPos: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prev) => {
        if (prev.cartPos === textToType.length) {
          clearInterval(intervalId);
          return prev;
        }

        return {
          text: prev.text + textToType[prev.cartPos],
          cartPos: prev.cartPos + 1,
        };
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [textToType, interval]);

  return text?.text;
};

export default useTypingAnimation;
