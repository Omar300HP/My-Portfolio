import useTypingAnimation from "@/hooks/useTypingAnimation";
import classNames from "classnames";
import { Poppins } from "next/font/google";
import { Input } from "antd";

const font = Poppins({ subsets: ["latin"], weight: "400" });

const textToType =
  "I'm a front-end developer with 3+ years of experience building beautiful, user-friendly web apps. I'm proficient in HTML, CSS, and JavaScript, and I'm always up-to-date on the latest technologies. I'm also a great team player and I'm always willing to go the extra mile.";

const Summary = ({ className }) => {
  const text = useTypingAnimation(textToType, 30);

  return (
    <div className={classNames("max-w-screen-lg", font.className, className)}>
      <Input.TextArea
        className="bg-transparent border-none text-gray-400 text-base md:text-2xl resize-none w-full outline-none shadow-none overflow-hidden caret-white"
        value={text}
        autoSize={{ minRows: 3, maxRows: 16 }}
        autoFocus
        ref={(ref) => ref?.focus()}
      />
    </div>
  );
};

export { Summary };
