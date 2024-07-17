/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "host.docker.internal",
      "testing.native-adventure.com",
      "native-adventure.com",
    ],
  },
  env: {
    base_url: `${process.env.NEXT_PUBLIC_URL_BACK}/api/`,
  },
};
module.exports = nextConfig;
