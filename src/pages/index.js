import { Poppins } from "next/font/google";
import { Card, Layout, Space } from "antd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  EmploymentHistory,
  Hello,
  Skills,
  Summary,
} from "@/components/StaticContent";

const font = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main
      className={`w-full min-h-screen absolute bg-bgblack ${font.className}`}
    >
      <Layout className="min-h-screen min-w-full bg-bgblack">
        <Navbar />
        <Layout.Content className="flex flex-col justify-start items-center pt-4 md:pt-12 w-full">
          <Card className="bg-bgblack w-[80%] border-none">
            <Space direction="vertical" size="large" className="w-full">
              <Hello />
              <Summary className={"md:pl-16"} />
            </Space>
          </Card>

          <Skills />

          <EmploymentHistory />
        </Layout.Content>
        <Footer />
      </Layout>
    </main>
  );
}
