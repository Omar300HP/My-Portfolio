import { PRIMARY_SKILLS, SECONDARY_SKILLS, SKILL_LEVELS } from "@/constants";
import { Skillbar } from "@/components/Skillbar";
import { Card, Space, Typography } from "antd";

const Skills = () => {
  return (
    <Card className="bg-bgblack w-[80%] border-none">
      <Typography.Title className="text-white text-4xl font-bold">
        Technologies & Skills
      </Typography.Title>
      <Space direction="vertical" className="pl-16 w-full">
        {PRIMARY_SKILLS.map((skill) => (
          <Skillbar
            skillName={skill.name}
            skillLevel={skill.level}
            key={skill.name}
          />
        ))}
      </Space>

      <Typography.Title className="text-white text-4xl font-bold mt-12">
        Additional technologies and skills
      </Typography.Title>
      <ul className="flex flex-row justify-start items-start flex-wrap w-[80%] gap-5 pl-16 list-disc">
        {SECONDARY_SKILLS.map((skill) => (
          <li key={skill.name} className="text-white text-base font-bold ml-8">
            {skill.name} / {SKILL_LEVELS[skill.level].label}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export { Skills };
