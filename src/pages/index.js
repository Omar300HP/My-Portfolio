import { Poppins } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Card, Layout, Space } from "antd";
import { Hello, Summary } from "@/components/StaticContent";

const font = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className={` min-h-screen bg-bgblack ${font.className}`}>
      <Layout className="min-h-screen min-w-full bg-bgblack">
        <Navbar />
        <Layout.Content className="flex flex-col justify-start items-center pt-12">
          <Card className="bg-bgblack max-w-fit border-none">
            <Space direction="vertical" size="large" className="w-full">
              <Hello />
              <Summary className={"pl-16"} />
            </Space>
          </Card>
        </Layout.Content>
      </Layout>
    </main>
  );
}
