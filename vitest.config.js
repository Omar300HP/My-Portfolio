import { defineConfig } from "vitest/config";

// The simulation seam is pure logic — plain node environment, no jsdom / WebGL.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
