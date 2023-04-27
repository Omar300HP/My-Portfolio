import { Layout, Space } from "antd";
import Link from "next/link";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import { Github, LinkedIn } from "../ContactIcons";

const font = Poppins({ subsets: ["latin"], weight: "700" });

const Navbar = () => {
  return (
    <Layout.Header
      className={classNames(
        "text-white max-w-full h-auto text-sm md:text-xl font-bold py-8 flex flex-row justify-center md:justify-start items-center flex-wrap gap-x-24 bg-inherit",
        font.className
      )}
    >
      <Link
        href="#Home"
        id="Home"
        className=" text-base md:text-xl"
        scroll={false}
      >
        Omar Abdel-Halim
      </Link>

      <Space size={"small"} className="md:ml-auto md:mr-6 ">
        <Github />
        <LinkedIn />
      </Space>
    </Layout.Header>
  );
};

export { Navbar };
