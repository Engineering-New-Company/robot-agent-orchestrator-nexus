
// API response types and request interfaces

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Request types for various operations
export interface CreateRoboticsSystemRequest {
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  specifications: Record<string, any>;
  location: string;
}

export interface UpdateRoboticsSystemRequest {
  name?: string;
  specifications?: Record<string, any>;
  location?: string;
  status?: string;
}

export interface CreateDeploymentRequest {
  name: string;
  description: string;
  robotics_system_id: string;
  environment: string;
  configuration: Record<string, any>;
}

export interface CreateAIModelRequest {
  name: string;
  type: string;
  framework: string;
  config: Record<string, any>;
}

export interface TrainingJobRequest {
  model_id: string;
  hyperparameters: Record<string, any>;
  dataset_id: string;
}

export interface CreatePipelineRequest {
  name: string;
  description: string;
  type: string;
  framework_version: string;
  source_code: string;
  requirements: string[];
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
}

export interface CreateIIoTDeviceRequest {
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  ip_address: string;
  port: number;
  protocol: string;
  robotics_system_id: string;
  configuration: Record<string, any>;
}

export interface SystemCommandRequest {
  command: string;
  parameters: Record<string, any>;
  robotics_system_id: string;
}

// WebSocket event types
export interface WebSocketEvents {
  'system:status': SystemMetrics;
  'sensor:data': SensorData;
  'alert:new': SystemAlert;
  'deployment:status': { deployment_id: string; status: string };
  'training:progress': { job_id: string; progress: number };
  'command:result': CommandExecution;
}
