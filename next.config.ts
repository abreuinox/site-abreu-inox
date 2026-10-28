import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Mantém a barra final nas URLs, como no canonical oficial (https://abreuinox.com/).
  trailingSlash: true,
  async redirects() {
    return [
      // Domínio canônico: www.abreuinox.com -> abreuinox.com
      {
        source: "/:path(.*)",
        has: [{ type: "host", value: "www.abreuinox.com" }],
        destination: "https://abreuinox.com/:path",
        permanent: true,
      },
      // O endereço de produção da Vercel duplica o site: consolida no domínio
      // oficial. Só o host exato; as URLs de preview continuam acessíveis.
      {
        source: "/:path(.*)",
        has: [{ type: "host", value: "site-abreu-inox.vercel.app" }],
        destination: "https://abreuinox.com/:path",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
