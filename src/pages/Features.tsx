
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Cpu, 
  Eye, 
  Zap, 
  Code, 
  Layers,
  Shield,
  Wifi,
  Settings,
  Activity,
  Database,
  Monitor,
  Rocket,
  GitBranch,
  ChevronRight,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: "Deep Reinforcement Learning",
      description: "Advanced DRL algorithms (PPO, SAC, DDPG) for autonomous robotics agents with real-time training and deployment",
      highlights: ["Multi-agent training", "Custom reward functions", "Distributed computing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Computer Vision Pipeline",
      description: "Real-time visual processing with object detection, depth estimation, and pose tracking for robotic perception",
      highlights: ["YOLO v8 inference", "Stereo vision", "Real-time tracking"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Layers,
      title: "Hugging Face Integration",
      description: "Direct access to 100,000+ AI models with one-click deployment for robotics applications",
      highlights: ["Model search & deploy", "Custom fine-tuning", "Inference playground"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Code,
      title: "Multi-Framework Support",
      description: "Seamless integration with PyTorch, TensorFlow, and specialized robotics frameworks",
      highlights: ["PyTorch pipelines", "TensorFlow.js", "Model conversion"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  const advancedCapabilities = [
    {
      icon: Wifi,
      title: "IIoT Connectivity",
      description: "Industrial-grade C++ pipelines for real-time system integration",
      features: ["OPC-UA protocols", "Real-time data streams", "Edge computing"]
    },
    {
      icon: Shield,
      title: "Production-Ready Deployment",
      description: "Enterprise-grade deployment with monitoring and failover systems",
      features: ["Auto-scaling", "Health monitoring", "Rollback capabilities"]
    },
    {
      icon: Database,
      title: "Training Workflows",
      description: "Automated ML pipelines with experiment tracking and model versioning",
      features: ["MLOps integration", "Experiment tracking", "Model registry"]
    },
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "Comprehensive system monitoring with performance metrics and alerts",
      features: ["Performance dashboards", "Alert systems", "Resource optimization"]
    }
  ];

  const useCases = [
    {
      title: "Autonomous Manufacturing",
      description: "Deploy AI-powered robotic arms for precision assembly and quality control",
      icon: Settings,
      metrics: ["99.7% accuracy", "45ms response time", "24/7 operation"]
    },
    {
      title: "Warehouse Automation",
      description: "Intelligent navigation and object manipulation for logistics optimization",
      icon: Activity,
      metrics: ["300% efficiency gain", "Real-time path planning", "Multi-robot coordination"]
    },
    {
      title: "Research & Development",
      description: "Rapid prototyping and testing of new robotics algorithms and models",
      icon: Rocket,
      metrics: ["Instant model deployment", "A/B testing", "Performance analytics"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Cpu className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Advanced Robotics Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            The most comprehensive platform for AI-driven robotics development, deployment, and management. 
            From research to production, accelerate your robotics projects with cutting-edge tools.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-green-600/20 text-green-400 border-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Production Ready
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500">
              <Zap className="w-3 h-3 mr-1" />
              Real-time Processing
            </Badge>
            <Badge className="bg-purple-600/20 text-purple-400 border-purple-500">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-400">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Advanced Capabilities */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Advanced Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedCapabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <Card key={index} className="bg-slate-800/30 border-slate-700 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-slate-600 to-slate-500 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-white">{capability.title}</CardTitle>
                    <CardDescription className="text-slate-400 text-sm">
                      {capability.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {capability.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                          <span className="text-xs text-slate-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Real-World Applications
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{useCase.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {useCase.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-slate-400">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center space-x-2">
              <GitBranch className="w-6 h-6 text-cyan-400" />
              <span>Technology Stack</span>
            </CardTitle>
            <CardDescription className="text-center text-slate-300">
              Built on industry-leading frameworks and protocols
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "PyTorch", "TensorFlow", "Hugging Face", "OpenCV", "ROS2", "C++", 
                "CUDA", "Docker", "Kubernetes", "WebRTC", "OPC-UA", "MQTT"
              ].map((tech, index) => (
                <div key={index} className="text-center p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <span className="text-sm font-medium text-slate-300">{tech}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-3">
            Get Started Now
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
