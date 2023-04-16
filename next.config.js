/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "nextShota",
    mongodb_password: "zZWhlN4W3NltwjPL",
    mongodb_clustername: "cluster0",
    mongodb_database: "blog",
  },
  images: {
    domains: ["donguzashvili.github.io"],
  },
  webpack(config, { nextRuntime }) {
    if (typeof nextRuntime === "undefined") {
      const { IgnorePlugin } = require("webpack");
      const ignoreFs = new IgnorePlugin({ resourceRegExp: /fs/ });
      config.plugins.push(ignoreFs);
    }
    return config;
  },
};

module.exports = nextConfig;
