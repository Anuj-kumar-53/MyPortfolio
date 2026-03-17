import React, { useState } from "react";
import {
    Award as LuAward,
    BadgeCheck as LuBadgeCheck,
    Cloud as LuCloud,
    Brain as LuBrain,
    Cpu as LuCpu,
    Code as LuCode,
    Users as LuUsers,
    Globe as LuGlobe,
    ShoppingBag as LuShoppingBag,
    Heart as LuHeart,
    Coffee as LuCoffee,
    ExternalLink as LuExternalLink,
    Star as LuStar,
    Trophy as LuTrophy,
    Medal as LuMedal,
    Layers as LuLayers,
    ChevronRight as LuChevronRight
} from "lucide-react";

const achievementsData = [
    {
        id: 1,
        title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle Corporation",
        date: "2025",
        description: "Validated knowledge of AI fundamentals, machine learning concepts, and Oracle Cloud AI services including Generative AI, OCI AI tools, and cloud-based ML workflows.",
        icon: LuAward,
        link: "https://drive.google.com/file/d/1ZhxKemPo5xNZQdDH4nt77OM5LMEzvcek/view?usp=sharing",
        gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
        border: "border-blue-500/50",
        text: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        id: 2,
        title: "Oracle Data Platform 2025 Certified Foundations Associate",
        issuer: "Oracle Corporation",
        date: "2025",
        description: "Demonstrated understanding of modern data platforms, databases, data warehousing, analytics, and cloud-based data management using Oracle technologies.",
        icon: LuCloud,
        link: "https://drive.google.com/file/d/1yPHEwBR3XdFJM3xub8e-OBDNZlq62Iu7/view?usp=drive_link",
        gradient: "from-red-500/20 via-orange-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(239,68,68,0.3)]",
        border: "border-red-500/50",
        text: "text-red-400",
        bg: "bg-red-500/10"
    },
    {
        id: 3,
        title: "Cloud Computing Certification",
        issuer: "NPTEL",
        date: "2025",
        description: "Completed certified course in Cloud Computing covering virtualization, cloud architecture, SaaS/PaaS/IaaS, distributed systems, and real-world cloud deployment models.",
        icon: LuCloud,
        link: "https://drive.google.com/file/d/17If1sOuGVsTp2Iw55Ti-6nKCL0mwjrgb/view?usp=drive_link",
        gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(99,102,241,0.3)]",
        border: "border-indigo-500/50",
        text: "text-indigo-400",
        bg: "bg-indigo-500/10"
    },
    {
        id: 4,
        title: "Data Structures & Algorithms Using C++",
        issuer: "Certification Course",
        date: "2024",
        description: "Learned advanced data structures, algorithm design, recursion, STL, and problem-solving techniques using C++ with hands-on coding practice.",
        icon: LuCode,
        link: "https://drive.google.com/file/d/1fBocMYwDYAwxWz0iVJGZGu7SSNH8qGJi/view?usp=sharing",
        gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(249,115,22,0.3)]",
        border: "border-orange-500/50",
        text: "text-orange-400",
        bg: "bg-orange-500/10"
    },
    {
        id: 5,
        title: "Responsive Web Design Certification",
        issuer: "freeCodeCamp",
        date: "2024",
        description: "Completed responsive web design certification covering HTML5, CSS3, Flexbox, Grid, accessibility, and mobile-first development principles.",
        icon: LuGlobe,
        link: "https://drive.google.com/file/d/1rR2b0OLa_BCbx7wLJeDRGPFyzqOLU7rs/view?usp=sharing",
        gradient: "from-gray-500/20 via-slate-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(100,116,139,0.3)]",
        border: "border-gray-500/50",
        text: "text-gray-400",
        bg: "bg-gray-500/10"
    },
    {
        id: 6,
        title: "Generative AI Certification",
        issuer: "NASSCOM",
        date: "2025",
        description: "Completed training in Generative AI concepts, Large Language Models, prompt engineering, and real-world AI applications in modern software systems.",
        icon: LuBrain,
        link: "https://drive.google.com/file/d/13Bjsq3fVlXn1EOsjNZCitEg4t7oRrf5j/view?usp=sharing",
        gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(34,197,94,0.3)]",
        border: "border-green-500/50",
        text: "text-green-400",
        bg: "bg-green-500/10"
    },
    {
        id: 7,
        title: "Introduction to Python",
        issuer: "Certification Course",
        date: "2024",
        description: "Learned Python fundamentals including data types, functions, OOP concepts, and problem solving using Python programming language.",
        icon: LuCode,
        link: "https://drive.google.com/file/d/1viaRGdRNlyUHVqUNc-kTRho0aQFKMdrE/view?usp=sharing",
        gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(234,179,8,0.3)]",
        border: "border-yellow-500/50",
        text: "text-yellow-400",
        bg: "bg-yellow-500/10"
    },
    {
        id: 8,
        title: "ReactJS Certification",
        issuer: "Certification Course",
        date: "2024",
        description: "Learned ReactJS fundamentals including components, hooks, state management, props, and building dynamic single-page applications.",
        icon: LuCode,
        link: "https://drive.google.com/file/d/1NrTUJdBmK-m5E139oqiJCKJi_LAfJYCM/view?usp=sharing",
        gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(6,182,212,0.3)]",
        border: "border-cyan-500/50",
        text: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        id: 9,
        title: "Think Design Prototype - Design Thinking & Figma Training",
        issuer: "Summer Training Program",
        date: "2024",
        description: "Completed training in Design Thinking, UI/UX principles, and Figma prototyping with hands-on experience in creating modern user interfaces.",
        icon: LuLayers,
        link: "https://drive.google.com/file/d/1iVU_-Eemo74cDQTi2kj2fehUcS4xtwek/view?usp=drive_link",
        gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]",
        border: "border-purple-500/50",
        text: "text-purple-400",
        bg: "bg-purple-500/10"
    }
];

const Certifications = ({ isDark }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeData = achievementsData[activeIndex];

    return (
        <section id="certifications" className={`section-padding relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-dark-bg' : 'bg-gradient-to-br from-gray-100 to-gray-200/50'}`}>
            {/* Background blobs – same as Hero */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`blob absolute w-96 h-96 rounded-full blur-3xl opacity-20 -top-20 -left-20 ${isDark ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
                <div className={`blob blob-delay-1 absolute w-80 h-80 rounded-full blur-3xl opacity-15 top-1/3 right-0 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />
                <div className={`blob blob-delay-2 absolute w-72 h-72 rounded-full blur-3xl opacity-10 bottom-10 left-1/3 ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`} />
                {isDark && (
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                )}
                {/* Certification-specific coloured orbs that react to selected card */}
                <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl ${activeData.gradient} rounded-full blur-[120px] pointer-events-none opacity-40 transition-all duration-1000`} />
                <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr ${activeData.gradient} rounded-full blur-[100px] pointer-events-none opacity-30 transition-all duration-1000`} />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="mb-12 text-center">
                    <p className={`font-mono text-sm mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>

                    </p>

                    <h2 className={`font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                        Defining <span className="gradient-text">Excellence</span>
                    </h2>
                    <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-6" />

                    <p className={`text-base leading-relaxed max-w-2xl mx-auto mb-12 font-body ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        A curated spotlight on the technical milestones, global rankings, and certifications that forge my professional engineering path.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch h-full min-h-[550px]">

                    {/* Left Side: Spotlight Area */}
                    <div className={`w-full lg:w-3/5 relative rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden group transition-all duration-500 ${activeData.glow} hover:border-white/20`}>

                        {/* Background gradient specifically for spotlight */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${activeData.gradient} opacity-40 transition-all duration-700`} />

                        {/* Huge floating icon background */}
                        <div className={`absolute -right-16 -bottom-16 sm:right-[-10%] sm:bottom-[-20%] opacity-10 pointer-events-none transition-all duration-1000 transform group-hover:scale-110 group-hover:-rotate-12`}>
                            <activeData.icon className={`w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] ${activeData.text}`} />
                        </div>

                        {/* Spotlight Content */}
                        <div
                            key={activeData.id}
                            className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between"
                            style={{ animationFillMode: 'both' }}
                        >
                            <div className="animate-fade-in-up">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 rounded-2xl ${activeData.bg} border ${activeData.border} flex items-center justify-center shadow-2xl`}>
                                        <activeData.icon className={`w-8 h-8 ${activeData.text}`} />
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full border border-white/10 bg-black/40 text-xs font-mono ${activeData.text} backdrop-blur-md`}>
                                        {activeData.date}
                                    </div>
                                </div>

                                <div className="overflow-hidden">
                                    <h3 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${activeData.text} leading-tight drop-shadow-md`}>
                                        {activeData.title}
                                    </h3>
                                </div>

                                <h4 className="font-body text-lg sm:text-xl font-medium text-white/80 mb-6 flex items-center gap-3">
                                    <span className={`w-8 h-[2px] ${activeData.bg} ${activeData.border} border-t`} />
                                    {activeData.issuer}
                                </h4>

                                <p className="font-body text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                                    {activeData.description}
                                </p>
                            </div>

                            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <a
                                    href={activeData.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${activeData.bg} border ${activeData.border} ${activeData.text} hover:bg-white/10 hover:text-white transition-all duration-300 font-semibold text-sm group/btn backdrop-blur-md shadow-lg`}
                                >
                                    <span>Verify Credential</span>
                                    <LuExternalLink className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: List Area */}
                    <div className="w-full lg:w-2/5 flex flex-col gap-3 relative">
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar">
                            {achievementsData.map((item, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 flex items-center gap-5 group
                                         ${isActive ? `bg-white/10 border-white/20 ${item.glow} scale-[1.02] -translate-x-1 lg:-translate-x-2` : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                                             ${isActive ? `${item.bg} text-white shadow-lg` : 'bg-white/5 text-white/50 group-hover:text-white group-hover:bg-white/10 group-hover:scale-110'}
                                         `}>
                                            <item.icon className={`w-6 h-6 ${isActive ? item.text : ''}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-body font-semibold truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-white/40 mt-1 font-mono uppercase tracking-wider truncate">{item.issuer}</p>
                                        </div>

                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? item.bg : 'group-hover:bg-white/5'}`}>
                                            <LuChevronRight className={`w-5 h-5 transition-all duration-300 ${isActive ? `${item.text} opacity-100 translate-x-0.5` : 'text-white/20 opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:translate-x-0'}`} />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 9999px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default Certifications;
