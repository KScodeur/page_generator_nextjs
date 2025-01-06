/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },  
  // Ajout de la configuration de redirection
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/projects',
  //       permanent: true,
  //     },
  //   ];
  // },
  // Gestion des routes 404
  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: '/:path*',
  //         destination: '/_error',
  //       },
  //     ],
  //   };
  // }
};

export default nextConfig;