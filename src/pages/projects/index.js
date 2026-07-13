import Head from "next/head";
import ProjectsHub from "@/components/projects/ProjectsHub";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects — Omar AbdelHalim</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Interactive projects and experiments built by Omar AbdelHalim — starting with Army Clash, a real-time Three.js battle simulation."
        />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0A0C11" />
      </Head>
      <ProjectsHub />
    </>
  );
}
