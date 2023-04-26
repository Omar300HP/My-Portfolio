import classNames from "classnames";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: "700" });

const Hello = () => {
  return (
    <div className={classNames("text-white text-3xl", font.className)}>
      Hello, I am Omar...
    </div>
  );
};

export { Hello };
