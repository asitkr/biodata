// import React, { useState, useRef, useEffect, Suspense } from 'react';
// import { X } from 'lucide-react';
// import gsap from 'gsap';

// interface GalleryImage {
//   url: string;
//   position: [number, number, number];
//   rotation: [number, number, number];
//   title: string;
// }

// const galleryImages: string[] = [
//   "/assests/p1.jpg",
//   "/assests/p2.jpg",
//   "/assests/p3.jpg",
//   "/assests/p4.jpg",
//   "/assests/p5.jpg",
//   "/assests/p6.jpg",
//   "/assests/p7.jpg",
//   "/assests/p8.jpg",
//   "/assests/p9.jpg",
//   "/assests/p10.jpg",
//   "/assests/p11.jpg",
//   "/assests/p12.jpg",
//   "/assests/p13.jpg",
// ];

// const Gallery: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [rotation, setRotation] = useState(0);
//   const animationRef = useRef(null);

//   useEffect(() => {
//     const animate = () => {
//       setRotation(prev => (prev + 0.15) % 360);
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   return (
//     // <section id="gallery" className={`py-20 pt-10 px-6 relative h-screen w-full bg-slate-900/10 overflow-hidden`}>
//     //   <div className="w-full mx-auto">
//     //     <div className='w-full mb-10'>
//     //       <h2 className={`text-4xl font-bold text-center dark:text-white text-gray-900`}>
//     //         3D Gallery
//     //       </h2>
//     //       <p className={`text-center mt-2 dark:text-gray-400 text-gray-600`}>
//     //         Click on any image to view in fullscreen
//     //       </p>
//     //     </div>
//     //     <div className={`rounded-2xl overflow-hidden p-2`}>
//     //       <div className="relative w-full h-[500px] perspective-1000">
//     //         <div
//     //           className="absolute inset-0 flex items-center justify-center"
//     //           style={{
//     //             transformStyle: 'preserve-3d',
//     //             transform: `rotateY(${rotation}deg)`
//     //           }}
//     //         >
//     //           {galleryImages?.map((img, i) => {
//     //             const angle = (i / galleryImages.length) * 360;
//     //             const currentAngle = (angle - rotation + 360) % 360;
//     //             const normalizedAngle = currentAngle > 180 ? 360 - currentAngle : currentAngle;
//     //             const scale = 1 - (normalizedAngle / 180) * 0.3;

//     //             return (
//     //               <div
//     //                 key={i}
//     //                 className="absolute cursor-pointer transition-transform duration-300 hover:scale-110"
//     //                 style={{
//     //                   transform: `rotateY(${angle}deg) translateZ(300px) scale(${scale})`,
//     //                   width: '220px',
//     //                   height: '380px',
//     //                   zIndex: Math.round(scale * 100)
//     //                 }}
//     //                 onClick={() => setSelectedImage(img)}
//     //               >
//     //                 <img
//     //                   src={img}
//     //                   alt={`Gallery ${i + 1}`}
//     //                   className="w-full h-full object-cover rounded-lg shadow-2xl cursor-pointer"
//     //                 />
//     //               </div>
//     //             );
//     //           })}
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {/* Fullscreen Image Modal */}
//     //   {selectedImage && (
//     //     <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 animate-fade-in">
//     //       <button
//     //         onClick={() => setSelectedImage(null)}
//     //         className="absolute top-6 right-6 p-3 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
//     //       >
//     //         <X size={28} className="text-white" />
//     //       </button>
//     //       <img
//     //         src={selectedImage}
//     //         alt="Fullscreen"
//     //         className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
//     //       />
//     //     </div>
//     //   )}
//     // </section>

//     <section id="gallery" className={`py-20 pt-10 px-6 relative h-screen w-full overflow-hidden dark:bg-gray-900/10 bg-gradient-to-br from-amber-50/20 via-orange-50/20 to-yellow-50/20`}>
//         <div className="w-full mx-auto">
//           <div className='w-full mb-10'>
//             <h2 className={`text-4xl font-bold text-center drk:text-white text-gray-900`}>
//               3D Gallery
//             </h2>
//             <p className={`text-center mt-2 dark:text-gray-400 text-gray-600`}>
//               Click on any image to view in fullscreen
//             </p>
//           </div>
//           <div className="rounded-2xl overflow-hidden p-2">
//             <div className="relative w-full h-[500px] perspective-1000">
//               <div 
//                 className="absolute inset-0 flex items-center justify-center"
//                 style={{ 
//                   transformStyle: 'preserve-3d',
//                   transform: `rotateY(${rotation}deg)`
//                 }}
//               >
//                 {galleryImages.map((img, i) => {
//                   const angle = (i / galleryImages.length) * 360;
//                   const currentAngle = (angle - rotation + 360) % 360;
//                   const normalizedAngle = currentAngle > 180 ? 360 - currentAngle : currentAngle;
//                   const scale = 1 - (normalizedAngle / 180) * 0.3;
                  
//                   // Front 3 images (within 72 degrees from center) are sharp
//                   // Calculate blur gradually for others based on angle
//                   let blur = 0;
//                   if (normalizedAngle > 72) {
//                     // Gradual blur from 0 to 6px as angle increases
//                     blur = Math.min(((normalizedAngle - 72) / 108) * 6, 6);
//                   }
                  
//                   // Reduce opacity for back images
//                   const opacity = normalizedAngle > 120 ? 0.6 : 1;
                  
//                   return (
//                     <div
//                       key={i}
//                       className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
//                       style={{
//                         transform: `rotateY(${angle}deg) translateZ(300px) scale(${scale})`,
//                         width: '220px',
//                         height: '380px',
//                         zIndex: Math.round(scale * 100),
//                         filter: `blur(${blur}px)`,
//                         opacity: opacity
//                       }}
//                       onClick={() => setSelectedImage(img)}
//                     >
//                       <img
//                         src={img}
//                         alt={`Gallery ${i + 1}`}
//                         className="w-full h-full object-cover rounded-lg shadow-2xl cursor-pointer"
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//   );
// };

// export default Gallery;

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const galleryImages = [
  "/assests/p1.jpg",
  "/assests/p2.jpg",
  "/assests/p3.jpg",
  "/assests/p4.jpg",
  "/assests/p5.jpg",
  "/assests/p6.jpg",
  "/assests/p7.jpg",
  "/assests/p8.jpg",
  "/assests/p9.jpg",
  "/assests/p10.jpg",
  "/assests/p11.jpg",
  "/assests/p12.jpg",
  "/assests/p13.jpg",
];

const Gallery: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!ringRef.current) return;

    gsap.to(ringRef.current, {
      rotateY: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
  }, []);

  const radius = window.innerWidth < 768 ? 380 : 520;
  const cardWidth = 240;
  const cardHeight = 380;

  return (
    <>
      {/* FULLSCREEN GALLERY */}
      <section className="fixed inset-0 w-screen h-screen bg-[#050816] overflow-hidden">
        {/* HEADER */}
        <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
          <h2 className="text-4xl font-bold text-white">3D Gallery</h2>
          <p className="mt-2 text-gray-400">
            Click on any image to view in fullscreen
          </p>
        </div>

        {/* PERSPECTIVE */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ perspective: "2000px" }}
        >
          {/* ROTATING RING */}
          <div
            ref={ringRef}
            className="relative"
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
            }}
          >
            {galleryImages?.map((img, i) => {
              const angle = (360 / galleryImages?.length) * i;

              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 cursor-pointer"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transform: `
                      translate(-50%, -50%)
                      rotateY(${angle}deg)
                      translateZ(${radius}px)
                    `,
                  }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULLSCREEN IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 p-3 bg-red-500 rounded-full hover:scale-110 transition"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} className="text-white" />
          </button>

          <img
            src={selectedImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
