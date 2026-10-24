import type { NextConfig } from "next";
import path from "node:path";

const rootDir = process.cwd().endsWith("frontend")
  ? path.resolve(process.cwd(), "..")
  : process.cwd();

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
