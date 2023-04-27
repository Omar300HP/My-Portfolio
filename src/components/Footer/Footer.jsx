import { Col, Layout, Row, Space, Typography } from "antd";
import { Github, LinkedIn } from "../ContactIcons";
import { MAIL, PHONE } from "@/constants";

const Footer = () => {
  return (
    <Layout.Footer className="text-white text-xl font-bold py-8 bg-inherit pt-8 md:pt-20 lg:pt-40">
      <Row>
        <Col span={24}>
          <Typography.Title className="text-white text-xs font-bold w-full text-center py-5 ">
            I built this website using Next.js, TailwindCSS, and Ant Design.
          </Typography.Title>
        </Col>
      </Row>

      <Row justify={"center"} className="gap-y-3">
        <Col lg={6}>
          <Typography.Title className="text-white text-sm font-bold w-56">
            © {new Date().getFullYear()} Omar Abdel-Halim
          </Typography.Title>
        </Col>

        <Col lg={6}>
          <Typography.Title className="text-white text-sm mb-0 font-bold w-56">
            Call me:
          </Typography.Title>
          <Typography.Text className="text-white text-sm font-bold" copyable>
            {PHONE}
          </Typography.Text>
        </Col>
        <Col lg={6}>
          <Typography.Title className="text-white text-sm mb-0 font-bold w-56">
            Email:
          </Typography.Title>
          <Typography.Text className="text-white text-sm font-bold" copyable>
            {MAIL}
          </Typography.Text>
        </Col>

        <Col lg={6}>
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
