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
        "text-white text-xl font-bold py-8 flex flex-row justify-start items-center gap-x-24 bg-inherit",
        font.className
      )}
    >
      <Link href="#Home" scroll={false}>
        Omar Abdel-Halim
      </Link>

      <Space size={"middle"} className="ml-auto mr-6">
        <Github />
        <LinkedIn />
      </Space>
    </Layout.Header>
  );
};

export { Navbar };
