import { Col, Row, Typography } from "antd";
import { SKILL_LEVELS } from "@/constants";
import classNames from "classnames";

const Skillbar = ({ skillName, skillLevel, className, size = "large" }) => {
  return (
    <div className={classNames("w-full", className)}>
      <Row justify={"space-between pb-1"}>
        <Col className="pl-8">
          <Typography.Text
            className={classNames("text-white text-xl font-bold", {
              "text-xl": size === "large",
              "text-base": size === "small",
            })}
          >
            {skillName}
          </Typography.Text>
        </Col>
        <Col className="pr-16">
          <Typography.Text
            className={classNames("text-white text-xl font-bold", {
              "text-xl": size === "large",
              "text-base": size === "small",
            })}
          >
            {SKILL_LEVELS[skillLevel].label}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            className={classNames("bg-[#162950] rounded-full", {
              "h-8": size === "large",
              "h-4": size === "small",
            })}
          >
            <div
              className="h-full rounded-full bg-linear-gradient "
              style={{ width: `${SKILL_LEVELS[skillLevel].pecentage}%` }}
            ></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export { Skillbar };
