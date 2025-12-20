import React, { useEffect, useRef, useState, useMemo } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const galleryImages: string[] = [
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
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  /* ---------------------------
     Handle resize
  ---------------------------- */
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------------------------
     Responsive flags
  ---------------------------- */
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  /* ---------------------------
     SHOW HALF + 2 IMAGES
     ON MOBILE & TABLET
  ---------------------------- */
  const visibleImages = useMemo(() => {
    if (isMobile || isTablet) {
      const halfPlusTwo = Math.ceil(galleryImages.length / 2) + 3;
      return galleryImages.slice(0, halfPlusTwo);
    }
    return galleryImages;
  }, [isMobile, isTablet]);

  /* ---------------------------
     GSAP rotation with offset
  ---------------------------- */
  useEffect(() => {
    if (!ringRef.current) return;

    const angleStep = 360 / visibleImages.length;
    const initialRotation = -angleStep * 2;

    gsap.set(ringRef.current, { rotateY: initialRotation });

    tweenRef.current = gsap.to(ringRef.current, {
      rotateY: initialRotation + 360,
      duration: 60,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [visibleImages]);

  /* ---------------------------
     Responsive sizing
  ---------------------------- */
  const radius = isMobile ? 260 : isTablet ? 380 : 520;
  const cardWidth = isMobile ? 160 : isTablet ? 200 : 240;
  const cardHeight = isMobile ? 240 : isTablet ? 320 : 380;

  return (
    <>
      {/* FULLSCREEN GALLERY */}
      <section className="relative w-screen h-screen bg-[#050816] overflow-hidden">
        {/* HEADER */}
        <div className="absolute top-6 left-0 right-0 z-10 text-center pointer-events-none px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Gallery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
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
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {visibleImages.map((img, i) => {
              const angle = (360 / visibleImages.length) * i;

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
                    alt={`Gallery ${i + 1}`}
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
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-3 bg-red-500 rounded-full hover:scale-110 transition"
          >
            <X size={26} className="text-white" />
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
