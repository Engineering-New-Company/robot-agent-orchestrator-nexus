
// API service layer for backend communication

import { APIResponse, PaginatedResponse } from '@/types/api';
import { 
  RoboticsSystem, 
  Deployment, 
  AIModel, 
  TrainingJob, 
  Pipeline, 
  IIoTDevice, 
  SystemAlert,
  SystemMetrics,
  CommandExecution
} from '@/types/backend';

const API_BASE_URL = process.env.VITE_API_BASE_URL || '/api';

class APIClient {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication header when implemented
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Robotics Systems
  async getRoboticsSystems(): Promise<PaginatedResponse<RoboticsSystem>> {
    return this.request('/robotics-systems');
  }

  async createRoboticsSystem(data: any): Promise<APIResponse<RoboticsSystem>> {
    return this.request('/robotics-systems', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRoboticsSystem(id: string, data: any): Promise<APIResponse<RoboticsSystem>> {
    return this.request(`/robotics-systems/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Deployments
  async getDeployments(systemId?: string): Promise<PaginatedResponse<Deployment>> {
    const query = systemId ? `?system_id=${systemId}` : '';
    return this.request(`/deployments${query}`);
  }

  async createDeployment(data: any): Promise<APIResponse<Deployment>> {
    return this.request('/deployments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDeploymentStatus(id: string): Promise<APIResponse<Deployment>> {
    return this.request(`/deployments/${id}/status`);
  }

  // AI Models
  async getAIModels(type?: string): Promise<PaginatedResponse<AIModel>> {
    const query = type ? `?type=${type}` : '';
    return this.request(`/ai-models${query}`);
  }

  async createAIModel(data: any): Promise<APIResponse<AIModel>> {
    return this.request('/ai-models', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async startTraining(data: any): Promise<APIResponse<TrainingJob>> {
    return this.request('/training-jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTrainingJobs(): Promise<PaginatedResponse<TrainingJob>> {
    return this.request('/training-jobs');
  }

  // Developer Pipelines
  async getPipelines(type?: string): Promise<PaginatedResponse<Pipeline>> {
    const query = type ? `?type=${type}` : '';
    return this.request(`/pipelines${query}`);
  }

  async createPipeline(data: any): Promise<APIResponse<Pipeline>> {
    return this.request('/pipelines', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validatePipeline(id: string): Promise<APIResponse<any>> {
    return this.request(`/pipelines/${id}/validate`, {
      method: 'POST',
    });
  }

  async deployPipeline(id: string): Promise<APIResponse<any>> {
    return this.request(`/pipelines/${id}/deploy`, {
      method: 'POST',
    });
  }

  // IIoT Devices
  async getIIoTDevices(): Promise<PaginatedResponse<IIoTDevice>> {
    return this.request('/iiot-devices');
  }

  async createIIoTDevice(data: any): Promise<APIResponse<IIoTDevice>> {
    return this.request('/iiot-devices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDeviceStatus(id: string): Promise<APIResponse<IIoTDevice>> {
    return this.request(`/iiot-devices/${id}/status`);
  }

  async getSensorData(deviceId: string, timeRange?: string): Promise<APIResponse<any[]>> {
    const query = timeRange ? `?range=${timeRange}` : '';
    return this.request(`/iiot-devices/${deviceId}/data${query}`);
  }

  // System Monitoring
  async getSystemAlerts(): Promise<PaginatedResponse<SystemAlert>> {
    return this.request('/alerts');
  }

  async resolveAlert(id: string): Promise<APIResponse<SystemAlert>> {
    return this.request(`/alerts/${id}/resolve`, {
      method: 'POST',
    });
  }

  async getSystemMetrics(systemId: string, timeRange?: string): Promise<APIResponse<SystemMetrics[]>> {
    const query = timeRange ? `?range=${timeRange}` : '';
    return this.request(`/robotics-systems/${systemId}/metrics${query}`);
  }

  // Commands
  async executeCommand(data: any): Promise<APIResponse<CommandExecution>> {
    return this.request('/commands', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCommandHistory(systemId?: string): Promise<PaginatedResponse<CommandExecution>> {
    const query = systemId ? `?system_id=${systemId}` : '';
    return this.request(`/commands${query}`);
  }
}

export const apiClient = new APIClient();
