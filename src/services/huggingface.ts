
// Hugging Face API service integration

import { 
  HuggingFaceModel, 
  HuggingFaceDataset, 
  ModelInferenceRequest, 
  ModelInferenceResponse,
  HuggingFaceSpace,
  RoboticsModelConfig 
} from '@/types/huggingface';

const HF_API_URL = 'https://huggingface.co/api';
const HF_INFERENCE_URL = 'https://api-inference.huggingface.co';

class HuggingFaceService {
  private apiToken: string | null = null;

  setApiToken(token: string) {
    this.apiToken = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }
    
    return headers;
  }

  // Models
  async searchModels(query: string, task?: string, limit: number = 20): Promise<HuggingFaceModel[]> {
    const params = new URLSearchParams({
      search: query,
      limit: limit.toString(),
      ...(task && { filter: `pipeline_tag:${task}` })
    });

    const response = await fetch(`${HF_API_URL}/models?${params}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to search models: ${response.statusText}`);
    }

    return response.json();
  }

  async getModel(modelId: string): Promise<HuggingFaceModel> {
    const response = await fetch(`${HF_API_URL}/models/${modelId}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to get model: ${response.statusText}`);
    }

    return response.json();
  }

  async getRoboticsModels(): Promise<HuggingFaceModel[]> {
    return this.searchModels('robotics', undefined, 50);
  }

  async getLeRobotModels(): Promise<HuggingFaceModel[]> {
    return this.searchModels('lerobot', undefined, 30);
  }

  // Datasets
  async searchDatasets(query: string, task?: string, limit: number = 20): Promise<HuggingFaceDataset[]> {
    const params = new URLSearchParams({
      search: query,
      limit: limit.toString(),
      ...(task && { filter: `task_categories:${task}` })
    });

    const response = await fetch(`${HF_API_URL}/datasets?${params}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to search datasets: ${response.statusText}`);
    }

    return response.json();
  }

  async getRoboticsDatasets(): Promise<HuggingFaceDataset[]> {
    return this.searchDatasets('robotics', undefined, 30);
  }

  // Inference
  async runInference(request: ModelInferenceRequest): Promise<ModelInferenceResponse> {
    const response = await fetch(`${HF_INFERENCE_URL}/models/${request.model}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        inputs: request.inputs,
        parameters: request.parameters,
        options: request.options
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return { outputs: null, error };
    }

    const outputs = await response.json();
    return { outputs };
  }

  // Vision models for robotics
  async runObjectDetection(modelId: string, imageData: string | Blob): Promise<any> {
    return this.runInference({
      model: modelId,
      inputs: imageData,
      parameters: { threshold: 0.5 }
    });
  }

  async runImageClassification(modelId: string, imageData: string | Blob): Promise<any> {
    return this.runInference({
      model: modelId,
      inputs: imageData
    });
  }

  // NLP for robot commands
  async processNaturalLanguageCommand(modelId: string, command: string): Promise<any> {
    return this.runInference({
      model: modelId,
      inputs: command,
      parameters: { max_length: 100 }
    });
  }

  // Spaces (for interactive demos)
  async searchSpaces(query: string, limit: number = 20): Promise<HuggingFaceSpace[]> {
    const params = new URLSearchParams({
      search: query,
      limit: limit.toString()
    });

    const response = await fetch(`${HF_API_URL}/spaces?${params}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to search spaces: ${response.statusText}`);
    }

    return response.json();
  }

  // Model deployment helpers
  async deployModelForRobotics(modelId: string, roboticsConfig: Partial<RoboticsModelConfig>): Promise<RoboticsModelConfig> {
    // Simulate model deployment process
    console.log(`Deploying model ${modelId} for robotics use case`);
    
    const config: RoboticsModelConfig = {
      model_id: modelId,
      task_type: roboticsConfig.task_type || 'vision',
      deployment_status: 'loading',
      robotics_metadata: {
        compatible_robots: roboticsConfig.robotics_metadata?.compatible_robots || ['universal'],
        input_modalities: roboticsConfig.robotics_metadata?.input_modalities || ['camera'],
        output_format: roboticsConfig.robotics_metadata?.output_format || 'json',
        real_time_capable: roboticsConfig.robotics_metadata?.real_time_capable || false
      }
    };

    // Simulate deployment time
    setTimeout(() => {
      config.deployment_status = 'ready';
      config.performance_metrics = {
        inference_time_ms: Math.random() * 100 + 50,
        accuracy: Math.random() * 0.2 + 0.8,
        memory_usage_mb: Math.random() * 500 + 200
      };
    }, 2000);

    return config;
  }
}

export const huggingFaceService = new HuggingFaceService();
