import { Layout, Space } from "antd";
import Link from "next/link";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { GITHUB_LINK, LINKEDIN_LINK } from "@/constants";
import { Poppins } from "next/font/google";
import classNames from "classnames";

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
        <Link href={GITHUB_LINK} target="_blank">
          <GithubOutlined />
        </Link>
        <Link href={LINKEDIN_LINK} target="_blank">
          <LinkedinOutlined />
        </Link>
      </Space>
    </Layout.Header>
  );
};

export { Navbar };
