export type VpnUser = {
  id: number;
  username: string;
  email: string;
  connectionStatus: 'connected' | 'disconnected';
  ipAddress: string;
  connectionDuration: string;
  country: string;
};
