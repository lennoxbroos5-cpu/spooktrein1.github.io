export interface GhostStory {
  title: string;
  content: string;
}

export enum AppState {
  IDLE = 'IDLE',
  FLICKERING = 'FLICKERING',
  HAUNTED = 'HAUNTED'
}