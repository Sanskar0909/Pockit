/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    transpilePackages: ["@repo/ui", "@repo/db", "@repo/store"],
    swcMinify: true,
  }
  
  export default config