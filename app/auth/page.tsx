"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Mail, Lock, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import api from "@/lib/axios"; // <-- Use custom axios instance
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Registration
        toast.success("Registration successful! Redirecting...");
        const res = await api.post("/auth/register", data);
        if (res.status === 201) {
          router.push("/agent");
        }
      } else {
        // Login
        const res = await api.post("/auth/login", {
          email: data.email,
          password: data.password,
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token); // Store token
          toast.success("Login successful! Redirecting...");
          // Redirect based on user role
          router.push("/agent"); // Redirect to /agent
        }
      }
    } catch (err: any) {
      toast.error("An error occurred. Please try again.");
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
      );
    }

    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    reset();
  };

  return (
    <AnimatedBackground variant="particles">
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="glass-morphism shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mx-auto flex items-center justify-center animate-pulse-glow"
              >
                <Bot className="h-8 w-8 text-white" />
              </motion.div>

              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-center">
                  <div className="font-medium text-lg mb-1">
                    The Automated AI Voice Agent Builder
                  </div>
                  <div className="text-sm text-purple-400">
                    The Victory Auto Service
                  </div>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {isSignUp && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="glass-morphism"
                        {...register("username", {
                          required: isSignUp ? "Username is required" : false,
                        })}
                      />
                      {errors.username && (
                        <p className="text-sm text-red-400">
                          {errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="First name"
                          className="glass-morphism"
                          {...register("firstName", {
                            required: isSignUp
                              ? "First name is required"
                              : false,
                          })}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-400">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Last name"
                          className="glass-morphism"
                          {...register("lastName", {
                            required: isSignUp
                              ? "Last name is required"
                              : false,
                          })}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-400">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="glass-morphism"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="glass-morphism"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 dark:text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isSignUp ? "Creating Account..." : "Signing In..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isSignUp ? (
                        <UserPlus className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      {isSignUp ? "Create Account" : "Sign In"}
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={toggleMode}
                  className="text-purple-400 hover:text-purple-300 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </Button>
              </div>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-purple-400 dark:text-muted-foreground dark:hover:text-purple-400 transition-colors"
                >
                  ← Back to home
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}
