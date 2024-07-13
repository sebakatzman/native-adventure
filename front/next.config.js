/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost', '127.0.0.1', 'testing.native-adventure.com', 'panelnativeadventure.pythonanywhere.com', '825620b6-6de9-4993-8356-dbde62e1afe5.booqable.shop'],
    },    
    env: {
      base_url: 'https://testing.native-adventure.com/api/'
    },
}
module.exports = nextConfig;
