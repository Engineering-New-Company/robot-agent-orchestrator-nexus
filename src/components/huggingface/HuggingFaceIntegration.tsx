
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Search, 
  Download, 
  Play, 
  Database, 
  Cpu, 
  Eye, 
  MessageSquare,
  Zap,
  Settings,
  ExternalLink,
  Star,
  Users
} from "lucide-react";
import { huggingFaceService } from '@/services/huggingface';
import { HuggingFaceModel, HuggingFaceDataset, RoboticsModelConfig } from '@/types/huggingface';

const HuggingFaceIntegration = () => {
  const [apiToken, setApiToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [models, setModels] = useState<HuggingFaceModel[]>([]);
  const [datasets, setDatasets] = useState<HuggingFaceDataset[]>([]);
  const [deployedModels, setDeployedModels] = useState<RoboticsModelConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('models');

  useEffect(() => {
    if (apiToken) {
      huggingFaceService.setApiToken(apiToken);
      setIsConnected(true);
      loadInitialData();
    }
  }, [apiToken]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [roboticsModels, roboticsDatasets, lerobotModels] = await Promise.all([
        huggingFaceService.getRoboticsModels(),
        huggingFaceService.getRoboticsDatasets(),
        huggingFaceService.getLeRobotModels()
      ]);
      
      setModels([...roboticsModels, ...lerobotModels]);
      setDatasets(roboticsDatasets);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery || !isConnected) return;
    
    setLoading(true);
    try {
      if (activeTab === 'models') {
        const results = await huggingFaceService.searchModels(searchQuery);
        setModels(results);
      } else if (activeTab === 'datasets') {
        const results = await huggingFaceService.searchDatasets(searchQuery);
        setDatasets(results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const deployModel = async (model: HuggingFaceModel) => {
    try {
      const taskType = model.pipeline_tag === 'object-detection' ? 'vision' : 
                     model.pipeline_tag === 'text-generation' ? 'nlp' : 'control';
      
      const config = await huggingFaceService.deployModelForRobotics(model.id, {
        task_type: taskType as any,
        robotics_metadata: {
          compatible_robots: ['universal'],
          input_modalities: taskType === 'vision' ? ['camera'] : ['text'],
          output_format: 'json',
          real_time_capable: true
        }
      });
      
      setDeployedModels(prev => [...prev, config]);
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  const getTaskIcon = (task: string) => {
    switch (task) {
      case 'computer-vision':
      case 'object-detection':
      case 'image-classification':
        return Eye;
      case 'text-generation':
      case 'text-classification':
        return MessageSquare;
      case 'reinforcement-learning':
        return Brain;
      default:
        return Cpu;
    }
  };

  const getTaskColor = (task: string) => {
    switch (task) {
      case 'computer-vision':
      case 'object-detection':
      case 'image-classification':
        return 'from-purple-500 to-pink-500';
      case 'text-generation':
      case 'text-classification':
        return 'from-green-500 to-emerald-500';
      case 'reinforcement-learning':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-orange-400" />
            <span>Connect to Hugging Face</span>
          </CardTitle>
          <CardDescription>
            Enter your Hugging Face API token to access models and datasets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">API Token</label>
            <Input
              type="password"
              placeholder="hf_..."
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <ExternalLink className="w-4 h-4" />
            <span>Get your token from</span>
            <a 
              href="https://huggingface.co/settings/tokens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              huggingface.co/settings/tokens
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search models, datasets, or spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-700 border-slate-600"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading} className="bg-orange-600 hover:bg-orange-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="models" className="data-[state=active]:bg-orange-600">
            <Brain className="w-4 h-4 mr-2" />
            Models
          </TabsTrigger>
          <TabsTrigger value="datasets" className="data-[state=active]:bg-orange-600">
            <Database className="w-4 h-4 mr-2" />
            Datasets
          </TabsTrigger>
          <TabsTrigger value="deployed" className="data-[state=active]:bg-orange-600">
            <Zap className="w-4 h-4 mr-2" />
            Deployed
          </TabsTrigger>
          <TabsTrigger value="inference" className="data-[state=active]:bg-orange-600">
            <Play className="w-4 h-4 mr-2" />
            Inference
          </TabsTrigger>
        </TabsList>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
              {models.map((model) => {
                const TaskIcon = getTaskIcon(model.pipeline_tag);
                const taskColor = getTaskColor(model.pipeline_tag);
                
                return (
                  <Card key={model.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${taskColor} flex items-center justify-center`}>
                          <TaskIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <Users className="w-3 h-3" />
                          <span>{model.downloads}</span>
                          <Star className="w-3 h-3" />
                          <span>{model.likes}</span>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-sm text-white truncate">{model.id}</CardTitle>
                        <CardDescription className="text-xs">
                          {model.pipeline_tag && (
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {model.pipeline_tag}
                            </Badge>
                          )}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {model.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                            onClick={() => deployModel(model)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Deploy
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-slate-600"
                            onClick={() => window.open(`https://huggingface.co/${model.id}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Datasets Tab */}
        <TabsContent value="datasets" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
              {datasets.map((dataset) => (
                <Card key={dataset.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <Users className="w-3 h-3" />
                        <span>{dataset.downloads}</span>
                        <Star className="w-3 h-3" />
                        <span>{dataset.likes}</span>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-sm text-white truncate">{dataset.id}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {dataset.description || 'No description available'}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {dataset.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-cyan-600 hover:bg-cyan-700"
                        onClick={() => window.open(`https://huggingface.co/datasets/${dataset.id}`, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Dataset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Deployed Models Tab */}
        <TabsContent value="deployed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deployedModels.map((config) => (
              <Card key={config.model_id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm text-white flex items-center justify-between">
                    <span className="truncate">{config.model_id}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        config.deployment_status === 'ready' ? 'border-green-500 text-green-400' :
                        config.deployment_status === 'loading' ? 'border-yellow-500 text-yellow-400' :
                        'border-red-500 text-red-400'
                      }`}
                    >
                      {config.deployment_status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                      {config.task_type}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {config.performance_metrics && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Inference Time</span>
                          <span className="text-white">{config.performance_metrics.inference_time_ms}ms</span>
                        </div>
                        <Progress value={(200 - config.performance_metrics.inference_time_ms) / 2} className="h-1" />
                      </div>
                      {config.performance_metrics.accuracy && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Accuracy</span>
                            <span className="text-white">{(config.performance_metrics.accuracy * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={config.performance_metrics.accuracy * 100} className="h-1" />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {deployedModels.length === 0 && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm col-span-full">
                <CardContent className="p-8 text-center">
                  <Zap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No models deployed yet</p>
                  <p className="text-sm text-slate-500 mt-2">Deploy models from the Models tab to see them here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Inference Tab */}
        <TabsContent value="inference" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-green-400" />
                <span>Model Inference</span>
              </CardTitle>
              <CardDescription>Run inference on deployed models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Inference interface coming soon</p>
                <p className="text-sm text-slate-500 mt-2">Deploy models to enable real-time inference</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HuggingFaceIntegration;
