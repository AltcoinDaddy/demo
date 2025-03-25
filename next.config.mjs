/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'i.seadn.io',
        'openseauserdata.com',
        'lh3.googleusercontent.com',
        'ipfs.io',
        'cloudflare-ipfs.com',
        'storage.googleapis.com',
        'api.chainbase.com',
        'api.chainbase.online',
        'img.seadn.io'
      ],
    },
    reactStrictMode: true,
  };
  
  export default nextConfig;