import Head from "next/head";
import ProjectShell from "@/components/projects/ProjectShell";
import ArmyClash from "@/components/projects/army-clash/ArmyClash";

export default function ArmyClashPage() {
  return (
    <>
      <Head>
        <title>Army Clash — Omar AbdelHalim</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Army Clash — a real-time, agent-based army battle simulation built with Three.js and react-three-fiber."
        />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0A0C11" />
      </Head>
      <ProjectShell crumb="army-clash">
        <ArmyClash />
      </ProjectShell>
    </>
  );
}
