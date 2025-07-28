"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: "gradient" | "particles" | "waves";
}

export function AnimatedBackground({
  children,
  variant = "gradient",
}: AnimatedBackgroundProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomPosition = () => {
    if (typeof window !== "undefined") {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
    }
    // Fallback for SSR
    return { x: 0, y: 0 };
  };

  const renderBackground = () => {
    switch (variant) {
      case "particles":
        // Only render particles on client to avoid hydration mismatch
        if (!isClient) return null;
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 dark:bg-purple-400/30 rounded-full"
                initial={getRandomPosition()}
                animate={getRandomPosition()}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        );
      case "waves":
        return (
          <div className="absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 800"
            >
              <defs>
                <linearGradient
                  id="wave-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(139, 92, 246, 0.15)"
                    className="dark:stop-color-[rgba(139,92,246,0.1)]"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(59, 130, 246, 0.15)"
                    className="dark:stop-color-[rgba(59,130,246,0.1)]"
                  />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
                fill="url(#wave-gradient)"
                initial={{
                  d: "M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z",
                }}
                animate={{
                  d: "M0,300 Q300,500 600,300 T1200,300 L1200,800 L0,800 Z",
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 light:from-purple-200/30 light:via-blue-200/30 light:to-indigo-200/30 animate-gradient" />
        );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {renderBackground()}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
