export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected'

export interface ConnectionState {
  status: ConnectionStatus
}
