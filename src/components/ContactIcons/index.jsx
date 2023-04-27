import Link from "next/link";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { GITHUB_LINK, LINKEDIN_LINK } from "@/constants";

export const Github = ({ size = 32 }) => (
  <Link href={GITHUB_LINK} target="_blank">
    <GithubOutlined style={{ fontSize: `${size}px` }} />
  </Link>
);

export const LinkedIn = ({ size = 32 }) => (
  <Link href={LINKEDIN_LINK} target="_blank">
    <LinkedinOutlined style={{ fontSize: `${size}px` }} />
  </Link>
);
