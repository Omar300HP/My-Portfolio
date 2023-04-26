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
      A front-end Developer with 3+ years of experience in the software
      industry. Proven ability to develop and deliver high-quality,
      cross-platform web applications using HTML, CSS, and JavaScript. Expertise
      in user interface design, development, and testing. Strong problem-solving
      and analytical skills. Ability to work independently and as part of a
      team.
    </div>
  );
};

export { Summary };
