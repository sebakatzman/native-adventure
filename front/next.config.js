/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost', '127.0.0.1', 'panelnativeadventure.pythonanywhere.com', 'picsum.photos'],
    },    
    env: {
      base_url: 'http://127.0.0.1:8000/api/'
      //base_url: 'https://panelnativeadventure.pythonanywhere.com/api/'
    },
}
module.exports = nextConfig;
