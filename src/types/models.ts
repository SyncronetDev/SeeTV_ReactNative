export interface Broadcast {
  id: number;
  title: string;
  description: string;
  duration: number; // duration in seconds
  ingestURL: string;
  streamURL: string;
}
