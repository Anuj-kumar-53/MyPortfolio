
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import AllProjects from "./components/AllProjects";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Home from "./components/Home";

import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { isDark, toggle } = useTheme();

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [loading, setLoading] = useState(true);

  // Loader timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Lock scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = showAllProjects ? "hidden" : "";
  }, [showAllProjects]);

  const handleViewAll = () => {
    setShowAllProjects(true);
  };

  const handleBack = () => {
    setShowAllProjects(false);

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 300);
  };

  // ✅ Loader screen
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-dark-bg" : "bg-gray-100"
      }`}
    >
      <Cursor />

      <Navbar
        isDark={isDark}
        toggleTheme={toggle}
        onViewAllProjects={handleViewAll}
      />

      {/* Home */}
      <Home isDark={isDark} onViewAll={handleViewAll} />

      {/* Overlay */}
      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] overflow-y-auto"
          >
            <AllProjects isDark={isDark} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}