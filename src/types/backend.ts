
// Core data models for the Robotics Systems Deployment Platform

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'developer' | 'operator' | 'viewer';
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'enterprise' | 'research' | 'startup';
  subscription_tier: 'basic' | 'professional' | 'enterprise';
  created_at: string;
  updated_at: string;
}

// Robotics Systems
export interface RoboticsSystem {
  id: string;
  name: string;
  type: 'robotic_arm' | 'mobile_robot' | 'drone' | 'industrial_robot' | 'custom';
  manufacturer: string;
  model: string;
  specifications: Record<string, any>;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  location: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface Deployment {
  id: string;
  name: string;
  description: string;
  robotics_system_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  environment: 'development' | 'staging' | 'production';
  configuration: Record<string, any>;
  metrics: DeploymentMetrics;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DeploymentMetrics {
  success_rate: number;
  average_execution_time: number;
  error_count: number;
  uptime_percentage: number;
  last_heartbeat: string;
}

// AI/ML Models and Algorithms
export interface AIModel {
  id: string;
  name: string;
  type: 'deep_rl' | 'computer_vision' | 'nlp' | 'custom';
  framework: 'pytorch' | 'tensorflow' | 'other';
  version: string;
  status: 'training' | 'trained' | 'deployed' | 'deprecated';
  performance_metrics: ModelMetrics;
  model_path: string;
  config: Record<string, any>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ModelMetrics {
  accuracy?: number;
  loss?: number;
  reward?: number; // For RL models
  inference_time?: number;
  training_epochs?: number;
  dataset_size?: number;
}

export interface TrainingJob {
  id: string;
  model_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  hyperparameters: Record<string, any>;
  dataset_id: string;
  logs: string[];
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

// Deep Reinforcement Learning
export interface RLEnvironment {
  id: string;
  name: string;
  type: 'simulation' | 'real_world';
  description: string;
  action_space: ActionSpace;
  observation_space: ObservationSpace;
  reward_function: string;
  termination_conditions: string[];
  robotics_system_id?: string;
  created_at: string;
}

export interface ActionSpace {
  type: 'discrete' | 'continuous' | 'multi_discrete';
  shape: number[];
  bounds?: { low: number[]; high: number[] };
}

export interface ObservationSpace {
  type: 'box' | 'discrete' | 'multi_binary';
  shape: number[];
  bounds?: { low: number[]; high: number[] };
}

// Computer Vision
export interface VisionPipeline {
  id: string;
  name: string;
  type: 'object_detection' | 'segmentation' | 'classification' | 'tracking' | 'pose_estimation';
  model_id: string;
  preprocessing_steps: string[];
  postprocessing_steps: string[];
  input_source: 'camera' | 'file' | 'stream';
  output_format: 'json' | 'image' | 'video';
  real_time: boolean;
  created_at: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  url: string;
  type: 'rtsp' | 'http' | 'usb';
  resolution: string;
  fps: number;
  robotics_system_id: string;
  status: 'active' | 'inactive' | 'error';
  created_at: string;
}

// NLP and Language Models
export interface NLPModel {
  id: string;
  name: string;
  type: 'chatbot' | 'command_parser' | 'text_analysis' | 'translation';
  base_model: string;
  fine_tuned: boolean;
  languages: string[];
  context_window: number;
  deployment_endpoint?: string;
  created_at: string;
}

export interface ConversationSession {
  id: string;
  user_id: string;
  nlp_model_id: string;
  context: Message[];
  robotics_system_id?: string;
  status: 'active' | 'ended';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Developer Integration Hub
export interface Pipeline {
  id: string;
  name: string;
  description: string;
  type: 'pytorch' | 'tensorflow' | 'cpp' | 'python' | 'other';
  framework_version: string;
  source_code: string;
  requirements: string[];
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
  test_cases: TestCase[];
  status: 'draft' | 'testing' | 'validated' | 'deployed' | 'deprecated';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TestCase {
  id: string;
  name: string;
  input_data: Record<string, any>;
  expected_output: Record<string, any>;
  status: 'pending' | 'passed' | 'failed';
  execution_time?: number;
  error_message?: string;
}

export interface CodeRepository {
  id: string;
  name: string;
  url: string;
  branch: string;
  access_token?: string;
  last_sync: string;
  auto_sync: boolean;
  organization_id: string;
  created_at: string;
}

// IIoT (Industrial Internet of Things)
export interface IIoTDevice {
  id: string;
  name: string;
  type: 'sensor' | 'actuator' | 'controller' | 'gateway';
  manufacturer: string;
  model: string;
  firmware_version: string;
  ip_address: string;
  port: number;
  protocol: 'modbus' | 'opcua' | 'mqtt' | 'http' | 'tcp' | 'udp';
  connection_status: 'connected' | 'disconnected' | 'error';
  last_heartbeat: string;
  robotics_system_id: string;
  configuration: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SensorData {
  id: string;
  device_id: string;
  sensor_type: string;
  value: number;
  unit: string;
  timestamp: string;
  quality: 'good' | 'uncertain' | 'bad';
  metadata?: Record<string, any>;
}

export interface CPPPipeline {
  id: string;
  name: string;
  description: string;
  source_files: string[];
  header_files: string[];
  dependencies: string[];
  compilation_flags: string[];
  binary_path?: string;
  status: 'source' | 'compiled' | 'deployed' | 'error';
  performance_metrics: {
    execution_time_ms?: number;
    memory_usage_mb?: number;
    cpu_usage_percent?: number;
  };
  created_by: string;
  created_at: string;
  updated_at: string;
}

// System Monitoring and Alerts
export interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  source: string;
  robotics_system_id?: string;
  device_id?: string;
  resolved: boolean;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
}

export interface SystemMetrics {
  id: string;
  robotics_system_id: string;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_io: { bytes_sent: number; bytes_received: number };
  temperature?: number;
  power_consumption?: number;
  timestamp: string;
}

// Real-time Communication
export interface WebSocketMessage {
  type: 'system_status' | 'sensor_data' | 'alert' | 'command' | 'response';
  payload: Record<string, any>;
  timestamp: string;
  source: string;
  target?: string;
}

export interface CommandExecution {
  id: string;
  command: string;
  parameters: Record<string, any>;
  robotics_system_id: string;
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'cancelled';
  result?: Record<string, any>;
  error_message?: string;
  executed_by: string;
  started_at: string;
  completed_at?: string;
}
