
// Database schema and migration utilities
// This would be used with Supabase integration

export const DATABASE_SCHEMA = {
  // Users and Organizations
  users: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    email: 'VARCHAR(255) UNIQUE NOT NULL',
    name: 'VARCHAR(255) NOT NULL',
    role: "VARCHAR(50) CHECK (role IN ('admin', 'developer', 'operator', 'viewer'))",
    organization_id: 'UUID REFERENCES organizations(id)',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  organizations: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    name: 'VARCHAR(255) NOT NULL',
    type: "VARCHAR(50) CHECK (type IN ('enterprise', 'research', 'startup'))",
    subscription_tier: "VARCHAR(50) CHECK (subscription_tier IN ('basic', 'professional', 'enterprise'))",
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  // Robotics Systems
  robotics_systems: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    name: 'VARCHAR(255) NOT NULL',
    type: 'VARCHAR(100) NOT NULL',
    manufacturer: 'VARCHAR(255)',
    model: 'VARCHAR(255)',
    specifications: 'JSONB',
    status: "VARCHAR(50) CHECK (status IN ('active', 'inactive', 'maintenance', 'error'))",
    location: 'VARCHAR(255)',
    organization_id: 'UUID REFERENCES organizations(id)',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  deployments: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    name: 'VARCHAR(255) NOT NULL',
    description: 'TEXT',
    robotics_system_id: 'UUID REFERENCES robotics_systems(id)',
    status: "VARCHAR(50) CHECK (status IN ('pending', 'running', 'completed', 'failed', 'paused'))",
    environment: "VARCHAR(50) CHECK (environment IN ('development', 'staging', 'production'))",
    configuration: 'JSONB',
    metrics: 'JSONB',
    created_by: 'UUID REFERENCES users(id)',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  // AI Models
  ai_models: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    name: 'VARCHAR(255) NOT NULL',
    type: "VARCHAR(50) CHECK (type IN ('deep_rl', 'computer_vision', 'nlp', 'custom'))",
    framework: "VARCHAR(50) CHECK (framework IN ('pytorch', 'tensorflow', 'other'))",
    version: 'VARCHAR(50)',
    status: "VARCHAR(50) CHECK (status IN ('training', 'trained', 'deployed', 'deprecated'))",
    performance_metrics: 'JSONB',
    model_path: 'VARCHAR(500)',
    config: 'JSONB',
    created_by: 'UUID REFERENCES users(id)',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  training_jobs: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    model_id: 'UUID REFERENCES ai_models(id)',
    status: "VARCHAR(50) CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled'))",
    progress: 'INTEGER DEFAULT 0',
    hyperparameters: 'JSONB',
    dataset_id: 'UUID',
    logs: 'TEXT[]',
    started_at: 'TIMESTAMP WITH TIME ZONE',
    completed_at: 'TIMESTAMP WITH TIME ZONE',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  // Developer Pipelines
  pipelines: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    name: 'VARCHAR(255) NOT NULL',
    description: 'TEXT',
    type: "VARCHAR(50) CHECK (type IN ('pytorch', 'tensorflow', 'cpp', 'python', 'other'))",
    framework_version: 'VARCHAR(50)',
    source_code: 'TEXT',
    requirements: 'TEXT[]',
    input_schema: 'JSONB',
    output_schema: 'JSONB',
    test_cases: 'JSONB',
    status: "VARCHAR(50) CHECK (status IN ('draft', 'testing', 'validated', 'deployed', 'deprecated'))",
    created_by: 'UUID REFERENCES users(id)',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  // IIoT Devices
  iiot_devices: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    name: 'VARCHAR(255) NOT NULL',
    type: "VARCHAR(50) CHECK (type IN ('sensor', 'actuator', 'controller', 'gateway'))",
    manufacturer: 'VARCHAR(255)',
    model: 'VARCHAR(255)',
    firmware_version: 'VARCHAR(100)',
    ip_address: 'INET',
    port: 'INTEGER',
    protocol: "VARCHAR(50) CHECK (protocol IN ('modbus', 'opcua', 'mqtt', 'http', 'tcp', 'udp'))",
    connection_status: "VARCHAR(50) CHECK (connection_status IN ('connected', 'disconnected', 'error'))",
    last_heartbeat: 'TIMESTAMP WITH TIME ZONE',
    robotics_system_id: 'UUID REFERENCES robotics_systems(id)',
    configuration: 'JSONB',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  sensor_data: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    device_id: 'UUID REFERENCES iiot_devices(id)',
    sensor_type: 'VARCHAR(100)',
    value: 'NUMERIC',
    unit: 'VARCHAR(50)',
    timestamp: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    quality: "VARCHAR(50) CHECK (quality IN ('good', 'uncertain', 'bad'))",
    metadata: 'JSONB',
  },

  // System Monitoring
  system_alerts: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    type: "VARCHAR(50) CHECK (type IN ('error', 'warning', 'info'))",
    severity: "VARCHAR(50) CHECK (severity IN ('low', 'medium', 'high', 'critical'))",
    title: 'VARCHAR(255) NOT NULL',
    message: 'TEXT',
    source: 'VARCHAR(255)',
    robotics_system_id: 'UUID REFERENCES robotics_systems(id)',
    device_id: 'UUID REFERENCES iiot_devices(id)',
    resolved: 'BOOLEAN DEFAULT FALSE',
    resolved_by: 'UUID REFERENCES users(id)',
    resolved_at: 'TIMESTAMP WITH TIME ZONE',
    created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  system_metrics: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    robotics_system_id: 'UUID REFERENCES robotics_systems(id)',
    cpu_usage: 'NUMERIC(5,2)',
    memory_usage: 'NUMERIC(5,2)',
    disk_usage: 'NUMERIC(5,2)',
    network_io: 'JSONB',
    temperature: 'NUMERIC(5,2)',
    power_consumption: 'NUMERIC(10,2)',
    timestamp: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  },

  command_executions: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    command: 'VARCHAR(255) NOT NULL',
    parameters: 'JSONB',
    robotics_system_id: 'UUID REFERENCES robotics_systems(id)',
    status: "VARCHAR(50) CHECK (status IN ('pending', 'executing', 'completed', 'failed', 'cancelled'))",
    result: 'JSONB',
    error_message: 'TEXT',
    executed_by: 'UUID REFERENCES users(id)',
    started_at: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
    completed_at: 'TIMESTAMP WITH TIME ZONE',
  },
};

export const INDEXES = [
  'CREATE INDEX idx_robotics_systems_organization ON robotics_systems(organization_id)',
  'CREATE INDEX idx_deployments_system ON deployments(robotics_system_id)',
  'CREATE INDEX idx_deployments_status ON deployments(status)',
  'CREATE INDEX idx_ai_models_type ON ai_models(type)',
  'CREATE INDEX idx_training_jobs_model ON training_jobs(model_id)',
  'CREATE INDEX idx_pipelines_type ON pipelines(type)',
  'CREATE INDEX idx_iiot_devices_system ON iiot_devices(robotics_system_id)',
  'CREATE INDEX idx_sensor_data_device_timestamp ON sensor_data(device_id, timestamp)',
  'CREATE INDEX idx_system_alerts_unresolved ON system_alerts(resolved) WHERE resolved = FALSE',
  'CREATE INDEX idx_system_metrics_system_timestamp ON system_metrics(robotics_system_id, timestamp)',
  'CREATE INDEX idx_command_executions_system ON command_executions(robotics_system_id)',
];

export const RLS_POLICIES = [
  // Row Level Security policies for multi-tenant access
  'ALTER TABLE robotics_systems ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE deployments ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE iiot_devices ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY',
  
  // Example policies (would need to be customized based on auth setup)
  `CREATE POLICY "Users can only access their organization's robotics systems" 
   ON robotics_systems FOR ALL 
   USING (organization_id = auth.jwt() ->> 'organization_id')`,
];
