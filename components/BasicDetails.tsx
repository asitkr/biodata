import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    User, Flower, GraduationCap, Users,
    Briefcase, Phone,
    MapPinHouse,
    UsersRound
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3D Ring Component
const Rings = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: "#FFD700",
        metalness: 1,
        roughness: 0.15,
        envMapIntensity: 1.5,
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Ring 1 */}
                <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[1.6, 0.2, 32, 100]} />
                    <primitive object={goldMaterial} />
                </mesh>

                {/* Ring 2 */}
                <mesh position={[0.8, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[1.6, 0.2, 32, 100]} />
                    <primitive object={goldMaterial} />
                </mesh>
            </Float>

            <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#FFD700" />
        </group>
    );
};

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 hover:!text-blue-500">{title}</h3>
    </div>
);

const isMapLink = (value: string) =>
    value.startsWith("https://maps.app.goo.gl") ||
    value.startsWith("https://www.google.com/maps");

const DetailRow = ({
    label,
    value,
    fullWidth = false,
}: {
    label: string;
    value: string | React.ReactNode;
    fullWidth?: boolean;
}) => {
    const isLink = typeof value === "string" && isMapLink(value);

    return (
        <div
            className={`${fullWidth ? "col-span-full" : ""} p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-none hover:shadow-sm dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)]`}
        >
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                {label}
            </p>

            <div className="text-sm md:text-base font-medium break-words">
                {isLink ? (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 break-all"
                    >
                        {value}
                    </a>
                ) : (
                    <span className="text-slate-900 dark:text-slate-200">
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
};

const BasicDetails: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".detail-section", {
                scrollTrigger: {
                    trigger: "#basic-details",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

            gsap.from(".animation-container", {
                scrollTrigger: {
                    trigger: "#basic-details",
                    start: "top 70%",
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="details" ref={containerRef} className="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Biodata Details</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Comprehensive details about my personal, professional, and family background.
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mt-4"></div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-8">
                    {/* Left Side - Details */}
                    <div className="w-full lg:w-3/5 space-y-10">
                        {/* Personal Details */}
                        <div className="detail-section">
                            <SectionHeader icon={User} title="Personal Details" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DetailRow label="Name" value="Ashit Kumar Sinha" />
                                <DetailRow label="Marital Status" value="Unmarried" />
                                <DetailRow label="Date of Birth" value="19 July 1996" />
                                <DetailRow label="Age" value="29 Years" />
                                <DetailRow label="Gender" value="Male" />
                                <DetailRow label="Height" value="5.6 Feet" />
                                <DetailRow label="Complexion" value="Wheatish / Medium" />
                                <DetailRow label="Physical Status" value="Normal" />
                                <DetailRow label="Mother Tongue" value="Hindi" />
                                <DetailRow label="Languages" value="Hindi, English" />
                            </div>
                        </div>

                        <div className="detail-section">
                        <SectionHeader icon={Briefcase} title="Professional Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailRow label="Occupation" value="Software Engineer" />
                            <DetailRow label="Company Name" value="Corporate Infotech Pvt. Ltd." />
                            <DetailRow label="Company Address" value="E-81, E Block, Sector 6, Noida, Uttar Pradesh 201301" />
                            <DetailRow label="Company Location" value="https://maps.app.goo.gl/KUk1M6oF72AmDiqb7" />
                            <DetailRow label="Current Location" value="Delhi" />
                        </div>
                    </div>
                    </div>

                    {/* Right Side - 3D Image */}
                    <div className="w-full lg:w-2/5 lg:sticky lg:top-24 h-[400px] md:h-[500px] animation-container relative">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-purple-500/10 rounded-full blur-3xl transform scale-75"></div>

                        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                            <pointLight position={[-10, -10, -10]} color="#FFD700" intensity={0.5} />
                            <Environment preset="studio" />
                            <Rings />
                            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000" />
                        </Canvas>

                        {/* Quote */}
                        {/* <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900 rounded-xl border-l-4 border-blue-500 shadow-md">
                            <p className="italic text-slate-600 dark:text-slate-300 text-center">
                                "Believing in the beauty of dreams and the power of connection. Looking for a partner who shares similar values of kindness, ambition, and growth."
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="flex flex-col-reverse lg:flex-row items-start gap-12">
                    {/* Education */}
                    <div className="w-full lg:w-3/5">
                        <SectionHeader icon={GraduationCap} title="Education" />
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white">B.E. (Computer Science and Engineering)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Sagar Institute of Science and Technology, Bhopal, MP</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white">Intermediate (12th)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The Earth Public School, Sripalpur, Punpun, Patna, Bihar</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white">Matriculation (10th)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Adarsh Vikas Vidyalaya, Phulwarisharif, Patna, Bihar</p>
                            </div>
                        </div>
                    </div>

                    {/* Religious Background */}
                    <div className="w-full lg:w-2/5">
                        <SectionHeader icon={Flower} title="Religious Background" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailRow label="Religion" value="Hindu" />
                            <DetailRow label="Caste / Gotra" value="Kurmi / Kashyap" />
                            <DetailRow label="Sub Caste" value="Awadhiya Kurmi / Kurmi Kshatriya" fullWidth />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="flex flex-col-reverse lg:flex-row items-start gap-12">
                    <div className="w-full lg:w-3/5">
                        <SectionHeader icon={UsersRound} title="Family Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailRow label="Father's Name" value="Idan Kumar Sinha" />
                            <DetailRow label="Father's Occupation:" value="Farmer" />
                            <DetailRow label="Mother's Name" value="Vina Devi" />
                            <DetailRow label="Mother's Occupation" value="Homemaker" />
                            <DetailRow label="Sister Name" value="Shalini Sinha" />
                            <DetailRow label="Sister Occupation" value="Homemaker" />
                            <DetailRow label="Brother / Sister" value="0(Me) / 1(Married)" />
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        <SectionHeader icon={UsersRound} title="Family Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailRow label="Family Type" value="Nuclear" />
                            <DetailRow label="Family Status:" value="Middle Class" />
                            <DetailRow label="Ancestral Origin" value="Bihar" />
                            <DetailRow label="Mother's Occupation" value="Homemaker" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BasicDetails;
