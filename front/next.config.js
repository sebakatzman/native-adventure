/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost', '127.0.0.1', 'panelnativeadventure.pythonanywhere.com', '825620b6-6de9-4993-8356-dbde62e1afe5.booqable.shop'],
    },    
    env: {
      base_url: 'http://127.0.0.1:8000/api/'
      //base_url: 'https://panelnativeadventure.pythonanywhere.com/api/' 
      //base_url: 'https://native-adventure.com/api/'
    },
}
module.exports = nextConfig;
