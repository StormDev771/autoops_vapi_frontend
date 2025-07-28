"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/animated-background";
import { TypingAnimation } from "@/components/typing-animation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
              <Bot className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            <TypingAnimation
              text="The Automated AI Voice Agent Builder"
              speed={80}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4"
          >
            Powered by{" "}
            <span className="text-purple-400 font-semibold">
              The Victory Auto Service
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Build, deploy, and manage intelligent AI voice agents with automated
            workflows. Transform your business communication with cutting-edge
            voice AI technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 dark:border-purple-400/50 dark:text-purple-400 px-8 py-3 text-lg"
              >
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <Card className="glass-morphism p-6 hover:scale-105 transition-transform duration-300">
              <Zap className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Deploy AI voice agents in minutes with our automated workflow
                system.
              </p>
            </Card>

            <Card className="glass-morphism p-6 hover:scale-105 transition-transform duration-300">
              <Shield className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-muted-foreground">
                Built with security and scalability in mind for
                business-critical applications.
              </p>
            </Card>

            <Card className="glass-morphism p-6 hover:scale-105 transition-transform duration-300">
              <Globe className="h-12 w-12 text-indigo-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
              <p className="text-muted-foreground">
                Integrate with popular platforms like Amazon, Shopify, and more.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}
