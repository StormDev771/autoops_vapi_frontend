"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/animated-background";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Bot,
  Zap,
  ShoppingCart,
  Package,
  Globe,
  Settings,
  Rocket,
  Workflow,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "react-toastify";

const marketplaces = [
  { value: "amazon", label: "Amazon", icon: Package },
  { value: "shopify", label: "Shopify", icon: ShoppingCart },
  { value: "ebay", label: "eBay", icon: Globe },
  { value: "etsy", label: "Etsy", icon: Package },
  { value: "woocommerce", label: "WooCommerce", icon: ShoppingCart },
  { value: "magento", label: "Magento", icon: Globe },
];

export default function BuildAgent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedMarketplace, setSelectedMarketplace] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth"); // Redirect to /auth if not logged in
    }
  }, [router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  const handleGenerateAgent = async () => {
    if (!selectedMarketplace /* || !agentName */) return;

    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGenerating(false);

    // Show success message or redirect
    alert("Vapi Voice Agent generated successfully!");
  };

  const handleDeployWorkflow = async () => {
    if (!selectedMarketplace /* || !agentName */) return;

    setIsDeploying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setIsDeploying(false);

    // Show success message or redirect
    alert("n8n Workflow generated and deployed successfully!");
  };

  // Add handlers for workflow buttons
  const handleGetVehicleByPhone = async () => {
    try {
      const res = await api.post("/deploy/n8n", {
        workflowname: "getVehicleByPhone",
      });

      if (res.status === 200) {
        toast.success("Workflow 'Get Vehicle by Phone' created successfully!");
      } else {
        toast.error("Failed to create workflow 'Get Vehicle by Phone'");
      }
    } catch (error) {
      console.error("Error deploying workflow:", error);
      toast.error("An error occurred while deploying the workflow.");
    }
  };

  const handleSuggestApptSlots = async () => {
    try {
      const res = await api.post("/deploy/n8n", {
        workflowname: "suggestApptSlots",
      });

      if (res.status === 200) {
        toast.success("Workflow 'Suggest Appt Slots' created successfully!");
      } else {
        toast.error("Failed to create workflow 'Suggest Appt Slots'");
      }
    } catch (error) {
      console.error("Error deploying workflow:", error);
      toast.error("An error occurred while deploying the workflow.");
    }
  };

  const handleBookAppt = async () => {
    try {
      const res = await api.post("/deploy/n8n", { workflowname: "bookAppt" });

      if (res.status === 200) {
        toast.success("Workflow 'Book Appt' created successfully!");
      } else {
        toast.error("Failed to create workflow 'Book Appt'");
      }
    } catch (error) {
      console.error("Error deploying workflow:", error);
      toast.error("An error occurred while deploying the workflow.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <AnimatedBackground variant="gradient">
        <div className="flex-1 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {" "}
            {/* Changed from max-w-4xl to max-w-7xl for wider layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Build Your AI Voice Agent
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create intelligent voice agents that integrate seamlessly with
                your favorite platforms
              </p>
              <p className="text-lg text-purple-400 font-medium mt-2">
                The Victory Auto Service - AI Voice Technology
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Configuration Card */}
              <Card className="glass-morphism">
                {/* CardHeader and CardContent in one row, responsive */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6">
                  {/* Header section */}
                  <div className="flex flex-col items-center md:items-start md:w-1/3">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      <span className="text-xl font-semibold">
                        Marketplace Select
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm text-center md:text-left">
                      Select your marketplace to integrate with your AI agent.
                    </span>
                  </div>
                  {/* Content section */}
                  <div className="flex flex-col items-center justify-center gap-4 md:w-2/3">
                    <Label
                      htmlFor="marketplace"
                      className="text-lg font-medium mb-2"
                    ></Label>
                    <Select
                      value={selectedMarketplace}
                      onValueChange={setSelectedMarketplace}
                    >
                      <SelectTrigger className="glass-morphism w-64">
                        <SelectValue placeholder="Select marketplace" />
                      </SelectTrigger>
                      <SelectContent>
                        {marketplaces.map((marketplace) => (
                          <SelectItem
                            key={marketplace.value}
                            value={marketplace.value}
                          >
                            <div className="flex items-center gap-2">
                              <marketplace.icon className="h-4 w-4" />
                              {marketplace.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Selected Platform Preview */}
              {selectedMarketplace && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass-morphism border-purple-500/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {(() => {
                          const marketplace = marketplaces.find(
                            (m) => m.value === selectedMarketplace
                          );
                          const Icon = marketplace?.icon || Globe;
                          return (
                            <>
                              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {marketplace?.label} Integration
                                </h3>
                                <p className="text-muted-foreground">
                                  Your agent will be optimized for{" "}
                                  {marketplace?.label} workflows
                                </p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-morphism hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-purple-400" />
                      Generate Vapi Voice Agent
                    </CardTitle>
                    <CardDescription>
                      Create an intelligent voice agent with advanced AI
                      capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleGenerateAgent}
                      disabled={
                        !selectedMarketplace /* || !agentName */ || isGenerating
                      }
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating Agent...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Rocket className="h-4 w-4" />
                          Generate Voice Agent
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-morphism hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Workflow className="h-5 w-5 text-blue-400" />
                      Deploy n8n Workflow
                    </CardTitle>
                    <CardDescription>
                      Create and deploy automated workflows for seamless
                      integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Responsive row for workflow buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <Button
                        variant="secondary"
                        className="flex-1 flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700"
                        onClick={handleGetVehicleByPhone}
                      >
                        Get Vehicle by Phone
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700"
                        onClick={handleSuggestApptSlots}
                      >
                        Suggest Appt Slots
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700"
                        onClick={handleBookAppt}
                      >
                        Book Appt
                      </Button>
                    </div>
                    <Button
                      onClick={handleDeployWorkflow}
                      disabled={
                        !selectedMarketplace /* || !agentName */ || isDeploying
                      }
                      variant="outline"
                      className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    >
                      {isDeploying ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                          Deploying Workflow...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Generate & Deploy Workflow
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="glass-morphism text-center">
                  <CardContent className="p-6">
                    <Bot className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
                    <p className="text-muted-foreground text-sm">
                      Advanced natural language processing for human-like
                      conversations
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-morphism text-center">
                  <CardContent className="p-6">
                    <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Real-time responses with minimal latency for smooth
                      interactions
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-morphism text-center">
                  <CardContent className="p-6">
                    <Globe className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Multi-Platform
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Seamless integration across all major e-commerce platforms
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  );
}
