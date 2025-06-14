
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import HuggingFaceIntegration from "@/components/huggingface/HuggingFaceIntegration";
import { 
  Brain, 
  Cpu, 
  Eye, 
  Zap, 
  Settings, 
  Activity, 
  Code, 
  Layers,
  Shield,
  Wifi,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

const Index = () => {
  const [activeSystem, setActiveSystem] = useState("drl");
  const [isDeploymentActive, setIsDeploymentActive] = useState(false);

  const systemModules = [
    {
      id: "drl",
      name: "Deep Reinforcement Learning",
      icon: Brain,
      status: "active",
      description: "Advanced DRL algorithms for autonomous robotics agents",
      progress: 87,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "cv",
      name: "Computer Vision",
      icon: Eye,
      status: "training",
      description: "Real-time visual processing and object recognition",
      progress: 62,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "nlp",
      name: "NLP & LLM Integration",
      icon: Layers,
      status: "ready",
      description: "Natural language processing for human-robot interaction",
      progress: 95,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "iiot",
      name: "IIoT Connectivity",
      icon: Wifi,
      status: "connected",
      description: "Industrial IoT integration with C++ pipelines",
      progress: 78,
      color: "from-orange-500 to-red-500"
    }
  ];

  const deploymentStats = [
    { label: "Active Robots", value: "12", change: "+3" },
    { label: "Success Rate", value: "98.7%", change: "+2.1%" },
    { label: "Avg Response Time", value: "45ms", change: "-8ms" },
    { label: "Uptime", value: "99.9%", change: "0%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    RoboSys Deploy
                  </h1>
                  <p className="text-sm text-slate-400">Advanced Robotics Systems Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-400">
                <Activity className="w-3 h-3 mr-1" />
                Systems Online
              </Badge>
              <Button 
                variant={isDeploymentActive ? "destructive" : "default"}
                onClick={() => setIsDeploymentActive(!isDeploymentActive)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isDeploymentActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isDeploymentActive ? "Stop Deployment" : "Start Deployment"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {deploymentStats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Badge variant="outline" className={`${
                    stat.change.startsWith('+') ? 'border-green-500 text-green-400' : 
                    stat.change.startsWith('-') ? 'border-blue-500 text-blue-400' : 
                    'border-slate-500 text-slate-400'
                  }`}>
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-modules" className="data-[state=active]:bg-blue-600">
              AI Modules
            </TabsTrigger>
            <TabsTrigger value="developer-hub" className="data-[state=active]:bg-blue-600">
              Developer Hub
            </TabsTrigger>
            <TabsTrigger value="robotics-arm" className="data-[state=active]:bg-blue-600">
              Robotics Control
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600">
              Monitoring
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Modules */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span>System Modules</span>
                  </CardTitle>
                  <CardDescription>AI & ML components status overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemModules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                      <div 
                        key={module.id} 
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          activeSystem === module.id 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                        }`}
                        onClick={() => setActiveSystem(module.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{module.name}</h4>
                              <Badge variant="outline" className={`text-xs ${
                                module.status === 'active' ? 'border-green-500 text-green-400' :
                                module.status === 'training' ? 'border-yellow-500 text-yellow-400' :
                                module.status === 'ready' ? 'border-blue-500 text-blue-400' :
                                'border-orange-500 text-orange-400'
                              }`}>
                                {module.status}
                              </Badge>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{module.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-white">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>Rapid deployment and control options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Code className="w-4 h-4 mr-2" />
                    Deploy PyTorch Pipeline
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Brain className="w-4 h-4 mr-2" />
                    Initialize DRL Training
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Wifi className="w-4 h-4 mr-2" />
                    Connect IIoT Devices
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Calibrate Vision System
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-slate-600 hover:bg-slate-700">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Systems
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Modules Tab */}
          <TabsContent value="ai-modules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-blue-400" />
                    <span>Deep RL Agents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-white mb-1">PPO Controller</h4>
                      <p className="text-sm text-slate-400">Arm manipulation tasks</p>
                      <Progress value={92} className="mt-2 h-1" />
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-white mb-1">SAC Navigator</h4>
                      <p className="text-sm text-slate-400">Path planning & navigation</p>
                      <Progress value={76} className="mt-2 h-1" />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Configure Agents
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    <span>Computer Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Object Detection</h4>
                      <p className="text-sm text-slate-400">YOLO v8 inference</p>
                      <Progress value={88} className="mt-2 h-1" />
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Depth Estimation</h4>
                      <p className="text-sm text-slate-400">Stereo vision pipeline</p>
                      <Progress value={95} className="mt-2 h-1" />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Manage CV Models
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-green-400" />
                    <span>Language Models</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Command Parser</h4>
                      <p className="text-sm text-slate-400">Natural language to actions</p>
                      <Progress value={97} className="mt-2 h-1" />
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Response Generator</h4>
                      <p className="text-sm text-slate-400">Human-robot interaction</p>
                      <Progress value={84} className="mt-2 h-1" />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Configure LLMs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Developer Hub Tab */}
          <TabsContent value="developer-hub" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-orange-400" />
                    <span>PyTorch Integration</span>
                  </CardTitle>
                  <CardDescription>Deep learning model deployment and training</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <h4 className="font-medium text-white mb-2">Custom Model Pipeline</h4>
                    <p className="text-sm text-slate-400 mb-3">Upload your PyTorch models for robotics applications</p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Code className="w-4 h-4 mr-2" />
                      Deploy PyTorch Model
                    </Button>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <h4 className="font-medium text-white mb-2">Training Environment</h4>
                    <p className="text-sm text-slate-400 mb-3">Distributed training for large models</p>
                    <Button variant="outline" className="w-full border-slate-600">
                      Configure Training
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span>C++ IIoT Pipelines</span>
                  </CardTitle>
                  <CardDescription>Industrial-grade C++ integration for real-time systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <h4 className="font-medium text-white mb-2">Real-time Control</h4>
                    <p className="text-sm text-slate-400 mb-3">High-performance C++ controllers for critical systems</p>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Shield className="w-4 h-4 mr-2" />
                      Deploy C++ Pipeline
                    </Button>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <h4 className="font-medium text-white mb-2">IIoT Connectivity</h4>
                    <p className="text-sm text-slate-400 mb-3">Connect to industrial protocols and devices</p>
                    <Button variant="outline" className="w-full border-slate-600">
                      Configure IIoT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Robotics Control Tab */}
          <TabsContent value="robotics-arm" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <span>Robotics Arm Controller</span>
                </CardTitle>
                <CardDescription>Real-time control interface for robotic manipulators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Joint Control</h4>
                    {[1, 2, 3, 4, 5, 6].map((joint) => (
                      <div key={joint} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Joint {joint}</span>
                          <span className="text-white">{Math.round(Math.random() * 180 - 90)}°</span>
                        </div>
                        <Progress value={Math.random() * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">System Status</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-sm text-slate-400">Position</p>
                        <p className="text-lg font-bold text-green-400">READY</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-sm text-slate-400">Force</p>
                        <p className="text-lg font-bold text-blue-400">12.3N</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-sm text-slate-400">Speed</p>
                        <p className="text-lg font-bold text-cyan-400">0.8 m/s</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-sm text-slate-400">Temp</p>
                        <p className="text-lg font-bold text-yellow-400">45°C</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Start Sequence
                      </Button>
                      <Button variant="outline" className="w-full border-slate-600">
                        Emergency Stop
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className="text-white">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Memory</span>
                      <span className="text-white">4.2GB / 16GB</span>
                    </div>
                    <Progress value={26} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">GPU Utilization</span>
                      <span className="text-white">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wifi className="w-5 h-5 text-blue-400" />
                    <span>Network Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Connected Devices</span>
                      <Badge className="bg-green-600">12 Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Data Throughput</span>
                      <span className="text-white">847 MB/s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Latency</span>
                      <span className="text-white">12ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Packet Loss</span>
                      <span className="text-green-400">0.01%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
