// import { useEffect } from 'react';

// const loadBooqableScript = () => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = 'https://825620b6-6de9-4993-8356-dbde62e1afe5.assets.booqable.com/v2/booqable.js';
//     script.async = true;
//     script.onload = resolve;
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// };

// const BooqableComponent = () => {
//   useEffect(() => {
//     loadBooqableScript()
//       .then(() => {
//         console.log('Booqable script loaded successfully');
//       })
//       .catch((error) => {
//         console.error('Failed to load Booqable script:', error);
//       });

//     return () => {
//       // Cleanup function
//       const script = document.querySelector('script[src="https://825620b6-6de9-4993-8356-dbde62e1afe5.assets.booqable.com/v2/booqable.js"]');
//       if (script) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <div className="container">
//         <div className="booqable-product-search"></div>
//         <div className="booqable-product-list" data-per="3"></div>
//       </div>
//     </div>
//   );
// };

// export default BooqableComponent;
