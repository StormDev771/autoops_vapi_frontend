"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/animated-background";
import { TypingAnimation } from "@/components/typing-animation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Users, TrendingUp, Play, Settings } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    redirect("/auth");
  }

  const stats = [
    {
      title: "Active Agents",
      value: "12",
      icon: Bot,
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Total Calls",
      value: "1,847",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      icon: Zap,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Active Users",
      value: "156",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <AnimatedBackground variant="waves">
        <div className="flex-1 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <TypingAnimation
                  text={`Welcome back, ${
                    session.user?.name?.split(" ")[0] || "User"
                  }!`}
                  speed={100}
                  className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                />
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                <TypingAnimation
                  text="The Automated AI Voice Agent Builder - Your command center for intelligent voice automation"
                  speed={50}
                />
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 0.8 }}
                className="text-lg text-purple-400 font-medium mt-2"
              >
                Powered by The Victory Auto Service
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                >
                  <Card className="glass-morphism hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                        >
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-purple-400" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Get started with your AI voice agent journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/agent" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white justify-start text-left">
                      <Play className="h-4 w-4 mr-2" />
                      Build New AI Voice Agent
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Existing Agents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest voice agent interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "New agent deployed",
                        time: "2 hours ago",
                        status: "success",
                      },
                      {
                        action: "Workflow updated",
                        time: "4 hours ago",
                        status: "info",
                      },
                      {
                        action: "System maintenance",
                        time: "1 day ago",
                        status: "warning",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.status === "success"
                              ? "bg-green-400"
                              : activity.status === "warning"
                              ? "bg-yellow-400"
                              : "bg-blue-400"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Branding */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass-morphism">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  The Victory Auto Service - Leading Innovation in AI Voice
                  Technology
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  );
}
