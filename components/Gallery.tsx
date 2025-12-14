import React, { useState, useRef, useEffect, Suspense } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface GalleryImage {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
}

const galleryImages: string[] = [
  "/assests/p1.jpg",
  "/assests/p2.jpg",
  "/assests/p3.jpg",
  "/assests/p4.jpg",
  "/assests/p5.jpg",
  "/assests/p6.jpg",
  "/assests/p7.jpg",
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.15) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className={`py-20 pt-10 px-6 relative h-screen w-full bg-slate-900/10 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className='w-full mb-10'>
          <h2 className={`text-4xl font-bold text-center dark:text-white text-gray-900`}>
            3D Gallery
          </h2>
          <p className={`text-center mt-2 dark:text-gray-400 text-gray-600`}>
            Click on any image to view in fullscreen
          </p>
        </div>
        <div className={`rounded-2xl overflow-hidden p-2`}>
          <div className="relative w-full h-[500px] perspective-1000">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`
              }}
            >
              {galleryImages.map((img, i) => {
                const angle = (i / galleryImages.length) * 360;
                const currentAngle = (angle - rotation + 360) % 360;
                const normalizedAngle = currentAngle > 180 ? 360 - currentAngle : currentAngle;
                const scale = 1 - (normalizedAngle / 180) * 0.3;

                return (
                  <div
                    key={i}
                    className="absolute cursor-pointer transition-transform duration-300 hover:scale-110"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(300px) scale(${scale})`,
                      width: '220px',
                      height: '380px',
                      zIndex: Math.round(scale * 100)
                    }}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-2xl cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 animate-fade-in">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
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
    </section>
  );
};

export default Gallery;