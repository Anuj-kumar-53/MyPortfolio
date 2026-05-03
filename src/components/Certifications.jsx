import React, { useState } from "react";
import {
    Award as LuAward,
    Cloud as LuCloud,
    Brain as LuBrain,
    Code as LuCode,
    Globe as LuGlobe,
    ExternalLink as LuExternalLink,
    ChevronRight as LuChevronRight,
    Layers as LuLayers
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
        colorTheme: "blue"
    },
    {
        id: 2,
        title: "Oracle Data Platform 2025 Certified Foundations Associate",
        issuer: "Oracle Corporation",
        date: "2025",
        description: "Demonstrated understanding of modern data platforms, databases, data warehousing, analytics, and cloud-based data management using Oracle technologies.",
        icon: LuCloud,
        link: "https://drive.google.com/file/d/1yPHEwBR3XdFJM3xub8e-OBDNZlq62Iu7/view?usp=drive_link",
        colorTheme: "red"
    },
    {
        id: 3,
        title: "Cloud Computing Certification",
        issuer: "NPTEL",
        date: "2025",
        description: "Completed certified course in Cloud Computing covering virtualization, cloud architecture, SaaS/PaaS/IaaS, distributed systems, and real-world cloud deployment models.",
        icon: LuCloud,
        link: "https://drive.google.com/file/d/17If1sOuGVsTp2Iw55Ti-6nKCL0mwjrgb/view?usp=drive_link",
        colorTheme: "indigo"
    },
    {
        id: 4,
        title: "Data Structures & Algorithms Using C++",
        issuer: "Certification Course",
        date: "2024",
        description: "Learned advanced data structures, algorithm design, recursion, STL, and problem-solving techniques using C++ with hands-on coding practice.",
        icon: LuCode,
        link: "https://drive.google.com/file/d/1fBocMYwDYAwxWz0iVJGZGu7SSNH8qGJi/view?usp=sharing",
        colorTheme: "orange"
    },
    {
        id: 5,
        title: "Responsive Web Design Certification",
        issuer: "freeCodeCamp",
        date: "2024",
        description: "Completed responsive web design certification covering HTML5, CSS3, Flexbox, Grid, accessibility, and mobile-first development principles.",
        icon: LuGlobe,
        link: "https://drive.google.com/file/d/1rR2b0OLa_BCbx7wLJeDRGPFyzqOLU7rs/view?usp=sharing",
        colorTheme: "gray"
    },
    {
        id: 6,
        title: "Generative AI Certification",
        issuer: "NASSCOM",
        date: "2025",
        description: "Completed training in Generative AI concepts, Large Language Models, prompt engineering, and real-world AI applications in modern software systems.",
        icon: LuBrain,
        link: "https://drive.google.com/file/d/13Bjsq3fVlXn1EOsjNZCitEg4t7oRrf5j/view?usp=sharing",
        colorTheme: "green"
    },
    {
        id: 7,
        title: "Introduction to Python",
        issuer: "Certification Course",
        date: "2024",
        description: "Learned Python fundamentals including data types, functions, OOP concepts, and problem solving using Python programming language.",
        icon: LuCode,
        link: "https://drive.google.com/file/d/1viaRGdRNlyUHVqUNc-kTRho0aQFKMdrE/view?usp=sharing",
        colorTheme: "yellow"
    },
    {
        id: 8,
        title: "ReactJS Certification",
        issuer: "Certification Course",
        date: "2024",
        description: "Learned ReactJS fundamentals including components, hooks, state management, props, and building dynamic single-page applications.",
        icon: LuCode,
        link: "https://drive.google.com/file/d/1NrTUJdBmK-m5E139oqiJCKJi_LAfJYCM/view?usp=sharing",
        colorTheme: "cyan"
    },
    {
        id: 9,
        title: "Think Design Prototype - Design Thinking & Figma Training",
        issuer: "Summer Training Program",
        date: "2024",
        description: "Completed training in Design Thinking, UI/UX principles, and Figma prototyping with hands-on experience in creating modern user interfaces.",
        icon: LuLayers,
        link: "https://drive.google.com/file/d/1iVU_-Eemo74cDQTi2kj2fehUcS4xtwek/view?usp=drive_link",
        colorTheme: "purple"
    }
];

// Helper to get theme-aware style classes
const getThemeStyles = (colorTheme, isDark) => {
    // In dark mode, we force all colors to use luxurious gold, bronze, and champagne tones
    // while keeping light mode colorful.
    const darkLuxeTheme = {
        gradient: "from-[#D4AF37]/20 via-[#B8860B]/10 to-transparent",
        glow: "shadow-[0_0_40px_rgba(212,175,55,0.25)]",
        border: "border-[#D4AF37]/40",
        text: "text-[#D4AF37]",
        bg: "bg-[#D4AF37]/10",
        hoverBg: "hover:bg-[#D4AF37]/15"
    };

    const colorMap = {
        blue: {
            light: {
                gradient: "from-blue-100/60 via-cyan-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
                border: "border-blue-300",
                text: "text-blue-700",
                bg: "bg-blue-50",
                hoverBg: "hover:bg-blue-100"
            }
        },
        red: {
            light: {
                gradient: "from-red-100/60 via-orange-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
                border: "border-red-300",
                text: "text-red-700",
                bg: "bg-red-50",
                hoverBg: "hover:bg-red-100"
            }
        },
        indigo: {
            light: {
                gradient: "from-indigo-100/60 via-blue-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
                border: "border-indigo-300",
                text: "text-indigo-700",
                bg: "bg-indigo-50",
                hoverBg: "hover:bg-indigo-100"
            }
        },
        orange: {
            light: {
                gradient: "from-orange-100/60 via-amber-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
                border: "border-orange-300",
                text: "text-orange-700",
                bg: "bg-orange-50",
                hoverBg: "hover:bg-orange-100"
            }
        },
        gray: {
            light: {
                gradient: "from-gray-100/60 via-slate-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(100,116,139,0.1)]",
                border: "border-gray-300",
                text: "text-gray-700",
                bg: "bg-gray-50",
                hoverBg: "hover:bg-gray-100"
            }
        },
        green: {
            light: {
                gradient: "from-green-100/60 via-emerald-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
                border: "border-green-300",
                text: "text-green-700",
                bg: "bg-green-50",
                hoverBg: "hover:bg-green-100"
            }
        },
        yellow: {
            light: {
                gradient: "from-yellow-100/60 via-amber-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
                border: "border-yellow-300",
                text: "text-yellow-700",
                bg: "bg-yellow-50",
                hoverBg: "hover:bg-yellow-100"
            }
        },
        cyan: {
            light: {
                gradient: "from-cyan-100/60 via-blue-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
                border: "border-cyan-300",
                text: "text-cyan-700",
                bg: "bg-cyan-50",
                hoverBg: "hover:bg-cyan-100"
            }
        },
        purple: {
            light: {
                gradient: "from-purple-100/60 via-pink-100/30 to-transparent",
                glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
                border: "border-purple-300",
                text: "text-purple-700",
                bg: "bg-purple-50",
                hoverBg: "hover:bg-purple-100"
            }
        }
    };
    return isDark ? darkLuxeTheme : (colorMap[colorTheme]?.light || colorMap.blue.light);
};

const Certifications = ({ isDark }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeData = achievementsData[activeIndex];
    const activeStyles = getThemeStyles(activeData.colorTheme, isDark);

    return (
        <section id="certifications" className={`section-padding relative overflow-hidden transition-colors duration-500 ${
            isDark ? 'bg-dark-bg' : 'bg-gradient-to-br from-light-bg to-light-surface'
        }`}>
            {/* Background blobs – theme aware */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`blob absolute w-96 h-96 rounded-full blur-3xl opacity-20 -top-20 -left-20 ${
                    isDark ? 'bg-[#D4AF37]' : 'bg-indigo-300'
                }`} />
                <div className={`blob blob-delay-1 absolute w-80 h-80 rounded-full blur-3xl opacity-15 top-1/3 right-0 ${
                    isDark ? 'bg-[#B8860B]' : 'bg-purple-300'
                }`} />
                <div className={`blob blob-delay-2 absolute w-72 h-72 rounded-full blur-3xl opacity-10 bottom-10 left-1/3 ${
                    isDark ? 'bg-[#8C6200]' : 'bg-blue-300'
                }`} />
                {isDark && (
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                )}
                {/* Certification-specific coloured orbs */}
                <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl ${activeStyles.gradient} rounded-full blur-[120px] pointer-events-none opacity-40 transition-all duration-1000`} />
                <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr ${activeStyles.gradient} rounded-full blur-[100px] pointer-events-none opacity-30 transition-all duration-1000`} />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="mb-12 text-center">
                    <h2 className={`font-display font-bold mb-4 ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                        Defining <span className="gradient-text">Excellence</span>
                    </h2>
                    <div className={`w-16 h-1 mx-auto rounded-full mb-6 ${isDark ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B]' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} />
                    <p className={`text-base leading-relaxed max-w-2xl mx-auto mb-12 font-body ${isDark ? 'text-[#A39171]' : 'text-light-textSecondary'}`}>
                        A curated spotlight on the technical milestones, global rankings, and certifications that forge my professional engineering path.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch h-full min-h-[550px]">

                    {/* Left Side: Spotlight Area */}
                    <div className={`w-full lg:w-3/5 relative rounded-[2.5rem] border ${
                        isDark 
                            ? `${activeStyles.border} bg-white/5 ${activeStyles.glow} hover:border-white/20` 
                            : `${activeStyles.border} bg-light-card shadow-xl ${activeStyles.glow} hover:shadow-2xl`
                    } overflow-hidden group transition-all duration-500`}>
                        
                        {/* Background gradient for spotlight */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${activeStyles.gradient} opacity-40 transition-all duration-700`} />

                        {/* Huge floating icon background */}
                        <div className={`absolute -right-12 -bottom-12 sm:right-[-10%] sm:bottom-[-20%] opacity-10 pointer-events-none transition-all duration-1000 transform group-hover:scale-110 group-hover:-rotate-12`}>
                            <activeData.icon className={`w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] ${activeStyles.text}`} />
                        </div>

                        {/* Spotlight Content */}
                        <div key={activeData.id} className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
                            <div className="animate-fade-in-up">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 rounded-2xl ${activeStyles.bg} border ${activeStyles.border} flex items-center justify-center shadow-2xl`}>
                                        <activeData.icon className={`w-8 h-8 ${activeStyles.text}`} />
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full border ${
                                        isDark ? 'border-white/10 bg-black/40' : 'border-light-border bg-light-card/80'
                                    } text-xs font-mono ${activeStyles.text} backdrop-blur-md`}>
                                        {activeData.date}
                                    </div>
                                </div>

                                <div className="overflow-hidden">
                                    <h3 className={`font-display text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 ${activeStyles.text} leading-tight drop-shadow-md`}>
                                        {activeData.title}
                                    </h3>
                                </div>

                                <h4 className={`font-body text-lg sm:text-xl font-medium mb-6 flex items-center gap-3 ${
                                    isDark ? 'text-white/80' : 'text-light-textSecondary'
                                }`}>
                                    <span className={`w-8 h-[2px] ${activeStyles.bg} ${activeStyles.border} border-t`} />
                                    {activeData.issuer}
                                </h4>

                                <p className={`font-body text-base sm:text-lg leading-relaxed max-w-xl ${
                                    isDark ? 'text-white/60' : 'text-light-textSecondary'
                                }`}>
                                    {activeData.description}
                                </p>
                            </div>

                            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <a
                                    href={activeData.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${activeStyles.bg} border ${activeStyles.border} ${activeStyles.text} ${
                                        activeStyles.hoverBg
                                    } transition-all duration-300 font-semibold text-sm group/btn ${
                                        isDark ? 'backdrop-blur-md shadow-lg' : 'shadow-md'
                                    }`}
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
                                const itemStyles = getThemeStyles(item.colorTheme, isDark);
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 flex items-center gap-5 group
                                            ${isActive 
                                                ? `${isDark ? 'bg-white/10 border-white/20' : 'bg-light-card border-light-border shadow-md'} ${itemStyles.glow} scale-[1.02] -translate-x-1 lg:-translate-x-2` 
                                                : `${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-light-card/80 border-light-border hover:bg-light-card hover:shadow-sm'}`
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                                            ${isActive 
                                                ? `${itemStyles.bg} text-white shadow-lg` 
                                                : `${isDark ? 'bg-white/5 text-white/50 group-hover:text-white group-hover:bg-white/10 group-hover:scale-110' : 'bg-light-surface text-light-textSecondary group-hover:bg-light-border/40 group-hover:text-light-textPrimary group-hover:scale-110'}`
                                            }`}>
                                            <item.icon className={`w-6 h-6 ${isActive ? itemStyles.text : ''}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-body font-semibold truncate transition-colors duration-300 ${
                                                isActive 
                                                    ? (isDark ? 'text-white' : 'text-light-textPrimary')
                                                    : (isDark ? 'text-white/60 group-hover:text-white/90' : 'text-light-textSecondary group-hover:text-light-textPrimary')
                                            }`}>
                                                {item.title}
                                            </h4>
                                            <p className={`text-xs mt-1 font-mono uppercase tracking-wider truncate ${
                                                isDark ? 'text-white/40' : 'text-light-textSecondary'
                                            }`}>{item.issuer}</p>
                                        </div>

                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            isActive ? itemStyles.bg : (isDark ? 'group-hover:bg-white/5' : 'group-hover:bg-light-surface')
                                        }`}>
                                            <LuChevronRight className={`w-5 h-5 transition-all duration-300 ${
                                                isActive 
                                                    ? `${itemStyles.text} opacity-100 translate-x-0.5` 
                                                    : `${isDark ? 'text-white/20' : 'text-light-textSecondary'} opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:translate-x-0`
                                            }`} />
                                        </div>
                                    </button>
                                );
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
                    background: ${isDark ? 'transparent' : '#f1f1f1'};
                    border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'};
                    border-radius: 9999px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: ${isDark ? 'rgba(255, 255, 255, 0.2)' : '#94a3b8'};
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