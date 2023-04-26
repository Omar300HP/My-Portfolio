import classNames from "classnames";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: "400" });

const Summary = ({ className }) => {
  return (
    <div
      className={classNames(
        "text-gray-400 text-2xl max-w-screen-lg",
        font.className,
        className
      )}
    >
      I&apos;m a front-end developer with 3+ years of experience building
      beautiful, user-friendly web apps. I&apos;m proficient in HTML, CSS, and
      JavaScript, and I&apos;m always up-to-date on the latest technologies.
      I&apos;m also a great team player and I&apos;m always willing to go the
      extra mile.
    </div>
  );
};

export { Summary };
