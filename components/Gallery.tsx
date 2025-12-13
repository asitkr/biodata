import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Text, Environment, Float, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface GalleryImage {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
}

const images: string[] = [
  "../assests/p1.jpg",
  "../assests/p2.jpg",
  "../assests/p3.jpg",
  "../assests/p4.jpg",
  "../assests/p5.jpg",
  "../assests/p6.jpg",
  "../assests/p7.jpg",
];

// Calculate cylindrical positions
const RADIUS = 6.5;
const galleryData: GalleryImage[] = images?.map((url, i) => {
  const theta = (i / images.length) * 2 * Math.PI;
  return {
    url,
    position: [Math.sin(theta) * RADIUS, 0, Math.cos(theta) * RADIUS],
    rotation: [0, theta + Math.PI, 0], // Face inward
    title: `Project ${i + 1}`,
  };
});

function Card({ url, position, rotation, onClick }: { url: string, position: [number, number, number], rotation: [number, number, number], onClick: (url: string) => void }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  useFrame((state, delta) => {
    if (ref.current) {
      // Subtle floating animation
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, hovered ? 0.5 : 0, 0.1);
      // Scale up on hover
      const targetScale = hovered ? 1.15 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}
      onClick={() => onClick(url)}
      onPointerOver={() => {
        hover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        hover(false)
        document.body.style.cursor = 'default'
      }}
    >
      <Image
        url={url}
        transparent
        side={THREE.DoubleSide}
        scale={[3, 4]}
      />
    </group>
  );
}

function Carousel({ onSelect }: { onSelect: (url: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation of the entire carousel
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {galleryData.map((img, i) => (
        <Card key={i} {...img} onClick={onSelect} />
      ))}
    </group>
  );
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedImage(null)
    });
  };

  return (
    <section id="gallery" className="relative h-screen w-full bg-slate-900 overflow-hidden">
      <div className="absolute top-6 left-0 right-0 z-10 text-center pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">3D Projects Gallery</h2>
        <p className="text-slate-400 text-sm md:text-base">Click on an image to expand</p>
      </div>

      <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
        <fog attach="fog" args={['#0f172a', 10, 25]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Suspense fallback={<Text position={[0, 0, 0]} fontSize={1} color="white">Loading...</Text>}>
          <Carousel onSelect={setSelectedImage} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Full Screen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4 sm:p-8" onClick={handleClose}>
          <div
            ref={modalRef}
            className="relative w-auto h-auto max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Selected Project" className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl" />

            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 bg-red-400 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:rotate-90 z-50"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;