import { Col, Layout, Row, Space, Typography } from "antd";
import { Github, LinkedIn } from "../ContactIcons";
import { MAIL, PHONE } from "@/constants";

const Footer = () => {
  return (
    <Layout.Footer className="text-white text-xl font-bold py-8 bg-inherit pt-80">
      <Row>
        <Col span={"24"}>
          <Typography.Title className="text-white text-xs font-bold w-full text-center py-5 ">
            I built this website using Next.js, TailwindCSS, and Ant Design.
          </Typography.Title>
        </Col>
      </Row>

      <Row>
        <Col
          span={"24"}
          className="flex flex-row justify-start items-center gap-x-24"
        >
          <Typography.Text className="text-white text-sm font-bold">
            © {new Date().getFullYear()} Omar Abdel-Halim
          </Typography.Text>

          <Space direction="vertical" className="gap-y-1">
            <Typography.Title className="text-white text-xl mb-0 font-bold">
              Call me:
            </Typography.Title>
            <Typography.Text className="text-white text-xl font-bold" copyable>
              {PHONE}
            </Typography.Text>
          </Space>

          <Space direction="vertical" className="gap-y-1">
            <Typography.Title className="text-white text-xl mb-0 font-bold">
              Email:
            </Typography.Title>
            <Typography.Text className="text-white text-xl font-bold" copyable>
              {MAIL}
            </Typography.Text>
          </Space>

          <Space className="ml-auto mr-[12vw] gap-x-16">
            <Github size={72} />
            <LinkedIn size={72} />
          </Space>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export { Footer };
