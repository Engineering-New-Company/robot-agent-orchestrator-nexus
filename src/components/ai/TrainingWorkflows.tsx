
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Brain, 
  Database, 
  Cpu, 
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { aiFrameworksService, TrainingJob, TrainingConfig } from '@/services/aiFrameworks';
import { toast } from "@/components/ui/use-toast";

const TrainingWorkflows = () => {
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [frameworks, setFrameworks] = useState(aiFrameworksService.getAvailableFrameworks());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newJobConfig, setNewJobConfig] = useState<Partial<TrainingConfig>>({
    framework: '',
    model_architecture: '',
    hyperparameters: {
      learning_rate: 0.001,
      batch_size: 32,
      epochs: 10,
      optimizer: 'adam',
      loss_function: 'categorical_crossentropy'
    },
    dataset_config: {
      train_split: 0.8,
      validation_split: 0.1,
      test_split: 0.1,
      data_augmentation: true
    },
    hardware_config: {
      device: 'gpu',
      mixed_precision: false,
      distributed_training: false
    }
  });

  useEffect(() => {
    // Load existing training jobs
    setTrainingJobs(aiFrameworksService.getAllTrainingJobs());
    
    // Set up polling for job updates
    const interval = setInterval(() => {
      setTrainingJobs(aiFrameworksService.getAllTrainingJobs());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateTrainingJob = async () => {
    if (!newJobConfig.framework || !newJobConfig.model_architecture) {
      toast({
        title: "Missing configuration",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const job = await aiFrameworksService.createTrainingJob(
        `Training Job ${Date.now()}`,
        newJobConfig as TrainingConfig
      );
      
      setTrainingJobs(prev => [...prev, job]);
      setShowCreateForm(false);
      
      toast({
        title: "Training job created",
        description: `Job ${job.id} has been queued for training`
      });
    } catch (error) {
      toast({
        title: "Failed to create job",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const handleCancelJob = async (jobId: string) => {
    const success = aiFrameworksService.cancelTrainingJob(jobId);
    if (success) {
      toast({
        title: "Job cancelled",
        description: "Training job has been cancelled"
      });
    }
  };

  const getStatusIcon = (status: TrainingJob['status']) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'initializing':
      case 'training':
      case 'validating':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <Square className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TrainingJob['status']) => {
    switch (status) {
      case 'queued':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'initializing':
      case 'training':
      case 'validating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-orange-400" />
                <span>Training Workflows</span>
              </CardTitle>
              <CardDescription>
                Manage AI model training jobs across different frameworks
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Play className="w-4 h-4 mr-2" />
              New Training Job
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create Training Job Form */}
      {showCreateForm && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Create Training Job</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Framework
                </label>
                <Select 
                  value={newJobConfig.framework} 
                  onValueChange={(value) => setNewJobConfig(prev => ({ ...prev, framework: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((framework) => (
                      <SelectItem key={framework.name} value={framework.name}>
                        {framework.name} v{framework.version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Model Architecture
                </label>
                <Input
                  placeholder="e.g., ResNet50, BERT, GPT-2"
                  value={newJobConfig.model_architecture}
                  onChange={(e) => setNewJobConfig(prev => ({ ...prev, model_architecture: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Learning Rate
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  value={newJobConfig.hyperparameters?.learning_rate}
                  onChange={(e) => setNewJobConfig(prev => ({
                    ...prev,
                    hyperparameters: { ...prev.hyperparameters!, learning_rate: parseFloat(e.target.value) }
                  }))}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Batch Size
                </label>
                <Input
                  type="number"
                  value={newJobConfig.hyperparameters?.batch_size}
                  onChange={(e) => setNewJobConfig(prev => ({
                    ...prev,
                    hyperparameters: { ...prev.hyperparameters!, batch_size: parseInt(e.target.value) }
                  }))}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Epochs
                </label>
                <Input
                  type="number"
                  value={newJobConfig.hyperparameters?.epochs}
                  onChange={(e) => setNewJobConfig(prev => ({
                    ...prev,
                    hyperparameters: { ...prev.hyperparameters!, epochs: parseInt(e.target.value) }
                  }))}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Device
                </label>
                <Select 
                  value={newJobConfig.hardware_config?.device} 
                  onValueChange={(value) => setNewJobConfig(prev => ({
                    ...prev,
                    hardware_config: { ...prev.hardware_config!, device: value as any }
                  }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpu">CPU</SelectItem>
                    <SelectItem value="gpu">GPU</SelectItem>
                    <SelectItem value="tpu">TPU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleCreateTrainingJob} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Start Training
              </Button>
              <Button onClick={() => setShowCreateForm(false)} variant="outline" className="border-slate-600">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Training Jobs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainingJobs.map((job) => (
          <Card key={job.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(job.status)}
                  <CardTitle className="text-base">{job.name}</CardTitle>
                </div>
                <Badge className={`text-xs ${getStatusColor(job.status)}`}>
                  {job.status}
                </Badge>
              </div>
              <CardDescription>
                {job.framework} • {job.config.model_architecture}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                {(job.status === 'training' || job.status === 'validating') && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Epoch {job.current_epoch}/{job.total_epochs}
                      </span>
                      <span className="text-slate-300">{Math.round(job.progress)}%</span>
                    </div>
                    <Progress value={job.progress} className="h-2" />
                  </div>
                )}

                {/* Metrics */}
                {job.metrics && Object.keys(job.metrics).length > 0 && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {job.metrics.loss && (
                      <div>
                        <span className="text-slate-400">Loss:</span>
                        <span className="ml-2 text-white">{job.metrics.loss}</span>
                      </div>
                    )}
                    {job.metrics.accuracy && (
                      <div>
                        <span className="text-slate-400">Accuracy:</span>
                        <span className="ml-2 text-white">{(job.metrics.accuracy * 100).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Logs */}
                {job.logs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Recent Logs</h4>
                    <ScrollArea className="h-20 bg-slate-900 rounded p-2">
                      {job.logs.slice(-3).map((log, index) => (
                        <div key={index} className="text-xs text-slate-400 mb-1">
                          {log}
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {(job.status === 'training' || job.status === 'queued' || job.status === 'initializing') && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleCancelJob(job.id)}
                      className="border-red-600 text-red-400 hover:bg-red-600"
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  )}
                  {job.status === 'completed' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Zap className="w-3 h-3 mr-1" />
                      Deploy
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trainingJobs.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Brain className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No training jobs yet</p>
            <p className="text-sm text-slate-500 mt-2">Create your first training job to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingWorkflows;
