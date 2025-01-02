/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove data attributes added by browser extensions
  transpilePackages: [],
  // Clean unwanted attributes from the HTML
  experimental: {
    optimizeCss: true,
    htmlAttributes: {
      exclude: ['data-new-gr-c-s-check-loaded']
    }
  }
};

export default nextConfig;
