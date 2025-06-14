
// Hugging Face API types and interfaces

export interface HuggingFaceModel {
  id: string;
  modelId: string;
  author: string;
  sha: string;
  created_at: string;
  last_modified: string;
  private: boolean;
  gated: boolean;
  downloads: number;
  likes: number;
  tags: string[];
  pipeline_tag: string;
  library_name?: string;
  transformersInfo?: {
    pipeline_tag: string;
    auto_model: string;
  };
  cardData?: {
    language?: string[];
    license?: string;
    datasets?: string[];
    metrics?: string[];
  };
}

export interface HuggingFaceDataset {
  id: string;
  author: string;
  sha: string;
  created_at: string;
  last_modified: string;
  private: boolean;
  gated: boolean;
  downloads: number;
  likes: number;
  tags: string[];
  description?: string;
  cardData?: {
    language?: string[];
    license?: string;
    size_categories?: string[];
    task_categories?: string[];
  };
}

export interface ModelInferenceRequest {
  model: string;
  inputs: any;
  parameters?: Record<string, any>;
  options?: {
    wait_for_model?: boolean;
    use_cache?: boolean;
  };
}

export interface ModelInferenceResponse {
  outputs: any;
  error?: string;
  estimated_time?: number;
}

export interface HuggingFaceSpace {
  id: string;
  author: string;
  sha: string;
  created_at: string;
  last_modified: string;
  private: boolean;
  gated: boolean;
  likes: number;
  tags: string[];
  sdk: string;
  runtime?: {
    stage: string;
    hardware: string;
    storage: string;
  };
}

export interface RoboticsModelConfig {
  model_id: string;
  task_type: 'vision' | 'control' | 'planning' | 'nlp' | 'multimodal';
  deployment_status: 'ready' | 'loading' | 'error' | 'deploying';
  performance_metrics?: {
    inference_time_ms: number;
    accuracy?: number;
    memory_usage_mb: number;
  };
  robotics_metadata: {
    compatible_robots: string[];
    input_modalities: string[];
    output_format: string;
    real_time_capable: boolean;
  };
}
