export type IntegrationStatus = 'connected' | 'disconnected' | 'available' | 'pending' | 'error';

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  icon?: string;
  lastSynced?: Date;
}

export interface IntegrationProps {
  integration: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}