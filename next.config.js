/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname:
          "/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
      },
      {
        protocol: "http",
        hostname: "uhdtv.io",
        pathname: "/wp-content/uploads/2020/10/Sintel-3.jpg",
      },
      {
        protocol: "https",
        hostname: "download.blender.org",
        pathname: "/ED/cover.jpg",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
