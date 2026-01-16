export interface User {
  socketId: string;
  peerId: string;
  name: string;
  role: UserRole;
  room: string;
}

export type UserRole = 'Manager' | 'Shipper' | 'Cashier' | 'Staff';

export interface PeerConnection {
  peerId: string;
  call: any; // PeerJS MediaConnection
  remoteStream?: MediaStream;
}
