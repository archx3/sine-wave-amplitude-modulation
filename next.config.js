/** @type {import('next').NextConfig} */
const nextConfig = {}

const path = require('path');

/**
 * @type {import('next-react-svg').NextReactSvgConfig}
 */
const nextReactSvgConfig = {
  include: path.resolve(__dirname, 'src/assets/svg'),
};

const withReactSvg = require('next-react-svg')(nextReactSvgConfig);

module.exports = withReactSvg(nextConfig);
