import { ClockCircleOutlined } from "@ant-design/icons";
import { Col, Row, Timeline, Typography } from "antd";
import classNames from "classnames";
import styles from "./EmploymentHistory.module.css";

const EmploymentRecord = ({ children }) => (
  <Typography.Text className="text-gray-400 text-xs md:text-sm font-bold break-normal">
    {children}
  </Typography.Text>
);

const EmploymentHistory = () => {
  return (
    <Row className="w-[80%] p-6" justify={"center"}>
      <Col span={24}>
        <Typography.Title className="text-white text-base md:text-4xl font-bold">
          Employment History & Education
        </Typography.Title>
      </Col>

      <Timeline
        mode={"alternate"}
        className={classNames("p-8 ", styles.timeline)}
        items={[
          {
            label: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold pr-2">
                Present
              </Typography.Text>
            ),
            dot: (
              <ClockCircleOutlined className="bg-inherit text-xs md:text-xl" />
            ),
            children: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold break-normal">
                Software Developer, 3sixty, Atlanta (remote)
              </Typography.Text>
            ),
            color: "blue",
          },
          {
            children: (
              <EmploymentRecord>
                Working mainly on Company&apos;s HIPAA-Compliant web portals
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Led the front-end development effort to transition from NetSuite
                to its own custom software, saving the company $100,000 in
                annual subscription fees.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Led the front-end development effort to refactor and
                incrementally replace legacy front-end code bases with modern,
                healthy React code bases.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Developed and presented findings and solutions to audiences
                including senior executives and stakeholders.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Effectively coded software changes and alterations based on
                specific design specifications.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Applied and remained current with existing and emerging
                technologies.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Maintain front end applications and optimize it for performance
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Continuously look for ways to improve the products/services
              </EmploymentRecord>
            ),
          },
          {
            position: "left",
            label: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold px-2">
                DECEMBER 2019
              </Typography.Text>
            ),
            dot: (
              <ClockCircleOutlined className="bg-inherit text-xs md:text-xl" />
            ),
            children: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold break-normal">
                Software developer, SWISO Dev., Alexandria, EGYPT
              </Typography.Text>
            ),
            color: "blue",
          },
          {
            children: (
              <EmploymentRecord>
                Built and maintained several applications, both independently
                and as part of a team, including:
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Electronic Arbitration System of the International Quran
                Competition of King Abdul Aziz, a web application built with
                HTML, CSS, and JavaScript.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Wodooh, a distributed system used by the Saudi ministry of
                Health, built with React and Nodejs.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                Sejelli, a cross-platform app built with Flutter.
              </EmploymentRecord>
            ),
          },
          {
            children: (
              <EmploymentRecord>
                ONPOLL, a cross-platform app built with React-Native
              </EmploymentRecord>
            ),
          },
          {
            position: "left",
            label: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold px-2">
                DECEMBER 2018
              </Typography.Text>
            ),
            dot: (
              <ClockCircleOutlined className="bg-inherit text-xs md:text-xl" />
            ),
            children: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold break-normal">
                Joined the Egyptian Armed Forces, Cairo, EGYPT
              </Typography.Text>
            ),
            color: "blue",
          },
          {
            position: "left",
            label: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold px-2">
                JULY 2018
              </Typography.Text>
            ),
            dot: (
              <ClockCircleOutlined className="bg-inherit text-xs md:text-xl" />
            ),
            children: (
              <Typography.Text className="text-white text-xs md:text-xl font-bold break-normal">
                Bachelor of Mechanical Engineering, Alexandria University,
                Alexandria
              </Typography.Text>
            ),
            color: "blue",
          },
        ]}
      />
    </Row>
  );
};

export { EmploymentHistory };
